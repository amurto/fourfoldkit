const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const Student = require('../models/student');
const Job = require('../models/job');

const getStudents = async (req, res, next) => {
  let students;
  try {
    students = await Student.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching students failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ students: students.map(student => student.toObject({ getters: true })) });
};

const getJobs = async (req, res, next) => {
  let jobs;
  try {
    jobs = await Job.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching jobs failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ jobs: jobs.map(job => job.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, email, password } = req.body;

  let existingStudent;
  try {
    existingStudent = await Student.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingStudent) {
    const error = new HttpError(
      'Student exists already, please login instead.',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create student, please try again.',
      500
    );
    return next(error);
  }

  const createdStudent = new Student({
    name,
    email,
    password: hashedPassword,

  });

  try {
    await createdStudent.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdStudent.id, email: createdStudent.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdStudent.id, email: createdStudent.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingStudent;

  try {
    existingStudent = await Student.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingStudent) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingStudent.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingStudent.id, email: existingStudent.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    userId: existingStudent.id,
    email: existingStudent.email,
    token: token
  });
};

const resumeUploader = async (req, res, next) => {
    res.json({
        hi: "hi"
      });
}

exports.getStudents = getStudents;
exports.signup = signup;
exports.login = login;
exports.resumeUploader = resumeUploader;
exports.getJobs = getJobs;
