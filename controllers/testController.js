import Test from "../models/Test.js";
import Question from "../models/Question.js";
import Result from "../models/Result.js";
import Progress from "../models/Progress.js";
import User from "../models/User.js";

export const getTests = async (req, res, next) => {
  try {
    const filter = req.query.chapterId ? { chapterId: req.query.chapterId } : {};
    const tests = await Test.find(filter).populate("chapterId", "name");
    res.json({ success: true, data: tests });
  } catch (err) { next(err); }
};

export const getTest = async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id).populate("questions").populate("chapterId", "name");
    if (!test) return res.status(404).json({ success: false, message: "Test not found" });
    res.json({ success: true, data: test });
  } catch (err) { next(err); }
};

export const createTest = async (req, res, next) => {
  try {
    const { questions: questionsData, ...testData } = req.body;
    const test = await Test.create(testData);
    if (questionsData && questionsData.length > 0) {
      const questions = questionsData.map(q => ({ ...q, testId: test._id }));
      await Question.insertMany(questions);
    }
    res.status(201).json({ success: true, data: test });
  } catch (err) { next(err); }
};

export const updateTest = async (req, res, next) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: test });
  } catch (err) { next(err); }
};

export const deleteTest = async (req, res, next) => {
  try {
    await Question.deleteMany({ testId: req.params.id });
    await Test.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Test deleted" });
  } catch (err) { next(err); }
};

// @route POST /api/tests/:id/submit
export const submitTest = async (req, res, next) => {
  try {
    const { answers, timeTaken } = req.body;
    const test = await Test.findById(req.params.id).populate("questions");
    if (!test) return res.status(404).json({ success: false, message: "Test not found" });

    let correctAnswers = 0;
    const resultAnswers = answers.map(ans => {
      const question = test.questions.find(q => q._id.toString() === ans.questionId);
      const isCorrect = question && question.correctAnswer === ans.selectedOption;
      if (isCorrect) correctAnswers++;
      return { questionId: ans.questionId, selectedOption: ans.selectedOption, isCorrect };
    });

    const score = Math.round((correctAnswers / test.questions.length) * 100);
    const passed = score >= test.passingScore;

    const result = await Result.create({
      userId: req.user.id, testId: test._id,
      score, totalQuestions: test.questions.length, correctAnswers,
      timeTaken, answers: resultAnswers, passed
    });

    // Award points
    const pointsEarned = passed ? 50 + Math.round(score / 2) : 10;
    await User.findByIdAndUpdate(req.user.id, { $inc: { points: pointsEarned } });

    // Update progress
    await Progress.findOneAndUpdate(
      { userId: req.user.id },
      { $addToSet: { completedTests: test._id } },
      { upsert: true }
    );

    // Check badges
    const user = await User.findById(req.user.id);
    const badges = [...user.badges];
    if (score === 100 && !badges.includes("Perfect Score")) badges.push("Perfect Score");
    if (user.points >= 500 && !badges.includes("Top Learner")) badges.push("Top Learner");
    if (badges.length !== user.badges.length) await User.findByIdAndUpdate(req.user.id, { badges });

    res.json({
      success: true, data: result,
      pointsEarned, passed, score,
      correctAnswers, totalQuestions: test.questions.length,
      questions: test.questions
    });
  } catch (err) { next(err); }
};
