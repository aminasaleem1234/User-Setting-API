const model = require('../models/userSettingsModel');
const { AppError } = require('../middleware/errorHandler');
async function getAllSettings(req, res, next) {
  try {
    const allSettings = await model.readAll();

    res.status(200).json({
      success: true,
      count: allSettings.length,
      data: allSettings
    });
  } catch (err) {
    next(err);
  }
}

async function getSettings(req, res, next) {
  try {
    const { userId } = req.params;
    const settings = await model.findOne(userId);

    if (!settings) {
      throw new AppError(`No settings found for userId: ${userId}`, 404);
    }

    res.status(200).json({ success: true, data: settings });
  } catch (err) {
    next(err);
  }
}

async function createSettings(req, res, next) {
  try {
    const { userId } = req.body;

    const existing = await model.findOne(userId);
    if (existing) {
      throw new AppError(`Settings already exist for userId: ${userId}`, 409);
    }

    const now = new Date().toISOString();

    const newSettings = {
      userId,
      language: req.body.language || 'EN',
      notificationsEnabled: req.body.notificationsEnabled ?? true,
      timezone: req.body.timezone || 'UTC',
      createdAt: now,
      updatedAt: now
    };

    const saved = await model.create(newSettings);
    console.log(` Created settings for: ${userId}`);

    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    next(err);
  }
}

async function updateSettings(req, res, next) {
  try {
    const { userId } = req.params;
    const changes = { ...req.body };

    delete changes.userId;
    delete changes.createdAt;
    changes.updatedAt = new Date().toISOString();

    const updated = await model.update(userId, changes);

    if (!updated) {
      throw new AppError(`No settings found for userId: ${userId}`, 404);
    }

    console.log(` Updated settings for: ${userId}`);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}
async function deleteSettings(req, res, next) {
  try {
    const { userId } = req.params;
    const deleted = await model.remove(userId);

    if (!deleted) {
      throw new AppError(`No settings found for userId: ${userId}`, 404);
    }

    console.log(` Deleted settings for: ${userId}`);
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllSettings,
  getSettings,
  createSettings,
  updateSettings,
  deleteSettings
};