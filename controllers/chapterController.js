import Chapter from "../models/Chapter.js";

export const getChapters = async (req, res, next) => {
  try {
    const filter = req.query.subjectId ? { subjectId: req.query.subjectId } : {};
    const chapters = await Chapter.find(filter).sort("order").populate("subjectId", "name");
    res.json({ success: true, data: chapters });
  } catch (err) { next(err); }
};

export const getChapter = async (req, res, next) => {
  try {
    const chapter = await Chapter.findById(req.params.id).populate("subjectId", "name classId");
    if (!chapter) return res.status(404).json({ success: false, message: "Chapter not found" });
    res.json({ success: true, data: chapter });
  } catch (err) { next(err); }
};

export const createChapter = async (req, res, next) => {
  try {
    const chapter = await Chapter.create(req.body);
    res.status(201).json({ success: true, data: chapter });
  } catch (err) { next(err); }
};

export const updateChapter = async (req, res, next) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: chapter });
  } catch (err) { next(err); }
};

export const deleteChapter = async (req, res, next) => {
  try {
    await Chapter.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Chapter deleted" });
  } catch (err) { next(err); }
};
