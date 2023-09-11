//@description  Register new user
//@route        POST /api/users
//@access       Public
const registerUser = (req, res) => {
    res.json({message: 'Register User'})
}

//@description  Authenticate a user
//@route        POST /api/users/login
//@access       Public
const loginUser = (req, res) => {
    res.json({message: 'Login User'})
}

//@description  Get user data
//@route        GET /api/users/me
//@access       Public
const getMe = (req, res) => {
    res.json({message: 'User Data'})
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
}