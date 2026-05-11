import Subject from "../models/Subject.js";

export const getSubjects = async (req, res, next) => {
  try {
    const filter = req.query.classId ? { classId: req.query.classId } : {};
    const subjects = await Subject.find(filter).populate("classId", "name grade");
    res.json({ success: true, data: subjects });
  } catch (err) { next(err); }
};

export const getSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.id).populate("classId", "name grade");
    if (!subject) return res.status(404).json({ success: false, message: "Subject not found" });
    res.json({ success: true, data: subject });
  } catch (err) { next(err); }
};

export const createSubject = async (req, res, next) => {
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json({ success: true, data: subject });
  } catch (err) { next(err); }
};

export const updateSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: subject });
  } catch (err) { next(err); }
};

export const deleteSubject = async (req, res, next) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Subject deleted" });
  } catch (err) { next(err); }
};
