import Video from "../models/Video.js";
import { extractYouTubeId, toYouTubeEmbedUrl, toYouTubeThumbUrl } from "../utils/youtube.js";

export const getVideos = async (req, res, next) => {
  try {
    const filter = req.query.chapterId ? { chapterId: req.query.chapterId } : {};
    const videos = await Video.find(filter).sort("order");
    res.json({ success: true, data: videos });
  } catch (err) { next(err); }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id).populate("chapterId", "name");
    if (!video) return res.status(404).json({ success: false, message: "Video not found" });
    res.json({ success: true, data: video });
  } catch (err) { next(err); }
};

export const createVideo = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    const id = extractYouTubeId(payload.youtubeUrl);
    if (!id) {
      return res.status(400).json({ success: false, message: "Invalid YouTube URL" });
    }
    payload.youtubeUrl = toYouTubeEmbedUrl(id);
    if (!payload.thumbnail) payload.thumbnail = toYouTubeThumbUrl(id);

    const video = await Video.create(payload);
    res.status(201).json({ success: true, data: video });
  } catch (err) { next(err); }
};

export const updateVideo = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (payload.youtubeUrl !== undefined) {
      const id = extractYouTubeId(payload.youtubeUrl);
      if (!id) {
        return res.status(400).json({ success: false, message: "Invalid YouTube URL" });
      }
      payload.youtubeUrl = toYouTubeEmbedUrl(id);
      if (!payload.thumbnail) payload.thumbnail = toYouTubeThumbUrl(id);
    }

    const video = await Video.findByIdAndUpdate(req.params.id, payload, { new: true });
    res.json({ success: true, data: video });
  } catch (err) { next(err); }
};

export const deleteVideo = async (req, res, next) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Video deleted" });
  } catch (err) { next(err); }
};
