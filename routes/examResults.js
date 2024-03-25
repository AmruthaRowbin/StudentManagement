const express = require('express');
const router = express.Router();
const examResultsController = require('../controllers/examresultsController');
const adminAuthMiddleware = require('../middleware/authMiddlware');

router.post('/examResults',adminAuthMiddleware, examResultsController.recordExamResult);
router.put('/examResults/:id', adminAuthMiddleware, examResultsController.updateExamResult);
router.get('/examResults',adminAuthMiddleware, examResultsController.getAllResultsForSpecificExam);
router.get('/examResults/:id',adminAuthMiddleware, examResultsController.getExamResultById);
router.delete('/examResults/:id', adminAuthMiddleware, examResultsController.deleteExamResult);



module.exports = router;