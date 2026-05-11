import Notification from "../models/Notification.js";

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort("-createdAt").limit(20);
    res.json({ success: true, data: notifications });
  } catch (err) { next(err); }
};

export const markRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ userId: req.user.id }, { isRead: true });
    res.json({ success: true, message: "Notifications marked as read" });
  } catch (err) { next(err); }
};

export const createNotification = async (req, res, next) => {
  try {
    const notification = await Notification.create({ ...req.body, userId: req.user.id });
    res.status(201).json({ success: true, data: notification });
  } catch (err) { next(err); }
};
