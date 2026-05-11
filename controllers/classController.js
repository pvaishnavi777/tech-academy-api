import Class from "../models/Class.js";

export const getClasses = async (req, res, next) => {
  try {
    const classes = await Class.find().sort("grade");
    res.json({ success: true, data: classes });
  } catch (err) { next(err); }
};

export const getClass = async (req, res, next) => {
  try {
    const cls = await Class.findById(req.params.id);
    if (!cls) return res.status(404).json({ success: false, message: "Class not found" });
    res.json({ success: true, data: cls });
  } catch (err) { next(err); }
};

export const createClass = async (req, res, next) => {
  try {
    const cls = await Class.create(req.body);
    res.status(201).json({ success: true, data: cls });
  } catch (err) { next(err); }
};

export const updateClass = async (req, res, next) => {
  try {
    const cls = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: cls });
  } catch (err) { next(err); }
};

export const deleteClass = async (req, res, next) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Class deleted" });
  } catch (err) { next(err); }
};
