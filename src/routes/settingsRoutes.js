
const express = require('express');
const router = express.Router();
const controller = require('../controllers/settingsController');
const { validateCreate, validateUpdate } = require('../middleware/validator');

router.get('/', controller.getAllSettings);

router.get('/:userId', controller.getSettings);
router.post('/', validateCreate, controller.createSettings);
router.put('/:userId', validateUpdate, controller.updateSettings);
router.delete('/:userId', controller.deleteSettings);

module.exports = router;