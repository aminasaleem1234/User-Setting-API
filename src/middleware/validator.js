const { AppError } = require('./errorHandler');

const VALID_LANGUAGES = ['EN', 'UR'];

function validateCreate(req, res, next) {
  const { userId, language, notificationsEnabled, timezone } = req.body;

  
  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    return next(new AppError('userId is required (non-empty string)', 400));
  }

  if (language !== undefined && !VALID_LANGUAGES.includes(language)) {
    return next(new AppError('language must be EN or UR', 400));
  }

  if (notificationsEnabled !== undefined && typeof notificationsEnabled !== 'boolean') {
    return next(new AppError('notificationsEnabled must be true/false', 400));
  }

  if (timezone !== undefined && typeof timezone !== 'string') {
    return next(new AppError('timezone must be a string', 400));
  }

  next();
}

function validateUpdate(req, res, next) {
  const { language, notificationsEnabled, timezone } = req.body;

  if (language !== undefined && !VALID_LANGUAGES.includes(language)) {
    return next(new AppError('language must be EN or UR', 400));
  }

  if (notificationsEnabled !== undefined && typeof notificationsEnabled !== 'boolean') {
    return next(new AppError('notificationsEnabled must be true/false', 400));
  }

  if (timezone !== undefined && typeof timezone !== 'string') {
    return next(new AppError('timezone must be a string', 400));
  }

  next();
}

module.exports = { validateCreate, validateUpdate };