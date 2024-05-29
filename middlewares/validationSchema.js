const { body, check } = require('express-validator');

// Validation rules for registration
exports.register = [
    body('fullname').trim().notEmpty().withMessage('Fullname is required'),
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
    body('phone_number').trim().notEmpty().withMessage('Phone Number is required').isLength({ min: 11, max: 11 }).withMessage('Phone Number must be 11 characters long'),
    body('street_number').trim().notEmpty().withMessage('Street Number is required'),
    body('street_name').trim().notEmpty().withMessage('Street Name is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('lga').trim().notEmpty().withMessage('LGA is required'),
    body('state').trim().notEmpty().withMessage('State is required'),
    body('password').trim().notEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

exports.updateUser = [
    body('fullname').trim().notEmpty().withMessage('Fullname is required'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
    body('phone_number').trim().notEmpty().withMessage('Phone Number is required').isLength({ min: 11, max: 11 }).withMessage('Phone Number must be 11 characters long'),
    body('street_number').trim().notEmpty().withMessage('Street Number is required'),
    body('street_name').trim().notEmpty().withMessage('Street Name is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('lga').trim().notEmpty().withMessage('LGA is required'),
    body('state').trim().notEmpty().withMessage('State is required'),
];

exports.login = [
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
    body('password').trim().notEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

exports.createPlan = [
    body('plan_title').trim().notEmpty().withMessage('Plan Title is required'),
    body('plan_description').trim().notEmpty().withMessage('Plan Description is required'),
    body('date').trim().notEmpty().withMessage('Date is required'),
    body('availability_status').trim().notEmpty().withMessage('Availability Status is required'),
];

exports.createEvent = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
];

exports.createGig = [
    body('video_url').trim().notEmpty().withMessage('Video Url is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('price').trim().notEmpty().withMessage('Price is required'),
    body('instrument').trim().notEmpty().withMessage('Instrument is required'),
];

exports.createBooking = [
    // body('showup_status').trim().notEmpty().withMessage('Show_up Status is required'),
    body('event_date').trim().notEmpty().withMessage('Event Date is required'),
    body('event_period').trim().notEmpty().withMessage('Event Period is required'),
    // body('remark').trim().notEmpty().withMessage('Remark is required'),
    body('event_to').trim().notEmpty().withMessage('Empty space'),
    body('event_from').trim().notEmpty().withMessage('Empty space'),
];

exports.createClient = [
    body('fullname').trim().notEmpty().withMessage('Fullname is required'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
    body('street_name').trim().notEmpty().withMessage('Street Name is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
];

exports.createStrike = [
    body('status').trim().notEmpty().withMessage('Status is required'),
];

