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
  return {
    title:     data.title,
    thumbnail: data.thumbnail,
    duration:  data.duration,
    videoUrl:  data.videoUrl || '',
    // Backend doesn't return social stats yet — hide them gracefully
    views:  null,
    likes:  null,
    shares: null,
    author: {
      username: data.author,
      nickname: data.author,
      avatar:   null,
      verified: false,
    },
    downloads: [
      { label: "No Watermark",  quality: data.isHd ? "HD" : "SD", type: "no_watermark", url: data.downloads.nowm  },
      { label: "With Watermark",quality: data.isHd ? "HD" : "SD", type: "watermark",    url: data.downloads.wm    },
      { label: "MP3 Audio",     quality: "128kbps",               type: "mp3",          url: data.downloads.mp3   },
      { label: "Cover Image",   quality: "JPG",                   type: "cover",        url: data.downloads.cover },
    ],
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

export function mapInstagramToUiShape(data) {
  const quality = data.isHd ? 'HD' : 'SD';
  const downloads = [];
  if (data.downloads.nowm) downloads.push({ label: 'Download Video', quality, type: 'no_watermark', url: data.downloads.nowm });
  if (data.downloads.cover) downloads.push({ label: 'Cover Image', quality: 'JPG', type: 'cover', url: data.downloads.cover });
  // Always show download button even if no specific URL yet
  if (downloads.length === 0) downloads.push({ label: 'Download Video', quality, type: 'no_watermark', url: '' });
  return {
    title:     data.title,
    thumbnail: data.thumbnail || data.downloads.cover || '',
    duration:  data.duration,
    videoUrl:  data.videoUrl || '',
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
