import axios from "axios";

/**
 * Axios instance — change NEXT_PUBLIC_API_URL in .env.local to switch environments.
 * Development : http://localhost:3001
 * Production  : https://your-backend.koyeb.app
 */
const api = axios.create({
  baseURL: "",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

/* ── Shape mapper ──────────────────────────────────────────────────────────────
   Converts the backend response into the structure ResultCard expects.
   Backend  → { title, author, thumbnail, duration, downloads: { nowm, wm, mp3, cover } }
   UI shape → { title, author: { username, nickname, avatar, verified },
                thumbnail, duration, views, likes, shares, downloads: [...] }
────────────────────────────────────────────────────────────────────────────── */
function mapToUiShape(data) {
  const images = data.images || null;
  const downloads = [];
  if (!images) {
    downloads.push({ label: "No Watermark",   quality: data.isHd ? "HD" : "SD", type: "no_watermark", url: data.downloads.nowm  });
    downloads.push({ label: "With Watermark", quality: data.isHd ? "HD" : "SD", type: "watermark",    url: data.downloads.wm    });
  }
  downloads.push({ label: "MP3 Audio",   quality: "128kbps", type: "mp3",   url: data.downloads.mp3   });
  downloads.push({ label: "Cover Image", quality: "JPG",     type: "cover", url: data.downloads.cover });
  return {
    title:     data.title,
    thumbnail: data.thumbnail,
    duration:  data.duration,
    videoUrl:  data.videoUrl || '',
    images,
    views: null, likes: null, shares: null,
    author: {
      username: data.author,
      nickname: data.author,
      avatar:   null,
      verified: false,
    },
    downloads,
  };
}

/* ── API functions ─────────────────────────────────────────────────────────── */

/**
 * Fetch video info from the backend.
 * @param {string} url - TikTok video URL entered by the user.
 * @returns {Promise<object>} Mapped video metadata ready for ResultCard.
 * @throws {Error} with a user-friendly message on failure.
 */
export async function fetchVideoInfo(url) {
  const { data } = await api.post("/api/download", { url });  // proxied via Next.js API route

  if (!data.success) {
    throw new Error(data.message || "Failed to fetch video.");
  }

  return mapToUiShape(data.data);
}

/**
 * Validate a TikTok URL format on the client before hitting the backend.
 * Accepts: tiktok.com  www.tiktok.com  vm.tiktok.com  vt.tiktok.com
 * @param {string} url
 * @returns {boolean}
 */
export function isValidTikTokUrl(url) {
  return /^https?:\/\/(www\.|vm\.|vt\.)?tiktok\.com\//i.test(url.trim());
}

export function proxyImageUrl(url) {
  if (!url) return '';
  const isInstagramCdn = url.includes('cdninstagram.com') || url.includes('fbcdn.net');
  if (!isInstagramCdn) return url;
  const backend = 'https://snapdin-backend-production.up.railway.app';
  return `${backend}/api/proxy-image?url=${encodeURIComponent(url)}`;
}

function proxyCdnUrl(url) {
  if (!url) return '';
  const isInstagramCdn = url.includes('cdninstagram.com') || url.includes('fbcdn.net');
  if (!isInstagramCdn) return url;
  const backend = 'https://snapdin-backend-production.up.railway.app';
  return `${backend}/api/proxy-video?url=${encodeURIComponent(url)}`;
}

export function mapInstagramToUiShape(data) {
  const quality = data.isHd ? 'HD' : 'SD';
  const proxiedThumb = proxyImageUrl(data.thumbnail || data.downloads.cover || '');
  const images = data.images ? data.images.map(proxyImageUrl) : null;
  const downloads = [];
  if (!images && data.downloads.nowm) downloads.push({ label: 'Download Video', quality, type: 'no_watermark', url: proxyCdnUrl(data.downloads.nowm) });
  if (data.downloads.cover) downloads.push({ label: 'Save Image', quality: 'JPG', type: 'cover', url: proxyImageUrl(data.downloads.cover) });
  if (downloads.length === 0) downloads.push({ label: 'Download', quality, type: 'no_watermark', url: '' });
  return {
    title:     data.title,
    thumbnail: proxiedThumb,
    duration:  data.duration,
    videoUrl:  data.videoUrl || '',
    images,
    views: null, likes: null, shares: null,
    author: {
      username: data.author,
      nickname: data.author,
      avatar:   null,
      verified: false,
    },
    downloads,
  };
}

export default api;
