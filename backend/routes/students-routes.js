const express = require('express');
const { check } = require('express-validator');

const studentsController = require('../controllers/students-controllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', studentsController.getStudents);

router.post(
  '/signup',
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  studentsController.signup
);

router.post('/login', studentsController.login);

router.post('/resume', studentsController.resumeUploader);
router.get('/getjobs', studentsController.getJobs);

module.exports = router;
