import Result from "../models/Result.js";

export const getMyResults = async (req, res, next) => {
  try {
    const results = await Result.find({ userId: req.user.id })
      .populate("testId", "title difficulty chapterId")
      .sort("-createdAt")
      .limit(20);
    res.json({ success: true, data: results });
  } catch (err) { next(err); }
};

export const getResult = async (req, res, next) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate("testId")
      .populate("answers.questionId");
    if (!result) return res.status(404).json({ success: false, message: "Result not found" });
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};
