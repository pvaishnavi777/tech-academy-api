export function extractYouTubeId(input = "") {
  const url = String(input).trim();
  if (!url) return null;

  // Accept raw IDs too
  if (/^[a-zA-Z0-9_-]{6,}$/.test(url) && !url.includes("/")) return url;

  const match = url.match(/(?:embed\/|v=|youtu\.be\/)([^&?/]+)/);
  return match ? match[1] : null;
}

export function toYouTubeEmbedUrl(videoId) {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function toYouTubeThumbUrl(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

