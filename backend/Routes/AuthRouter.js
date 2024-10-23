const router = require('express').Router();
const {signup,login} = require('../Controllers/AuthController');
const {SignupValidation,LoginValidation} = require('../Middlewares/AuthValidation');


// router.post('/login', (req, res) => {
//     res.send("Login Successfully");
// });

router.post('/signup',SignupValidation,signup);
router.post('/login',LoginValidation,login);

module.exports = router;
