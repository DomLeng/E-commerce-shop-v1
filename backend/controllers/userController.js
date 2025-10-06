import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from '../models/userModel.js'

// @desc   user authentication and get token
// @route  post /api/users/auth
// @access public

const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)

        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


// @desc    user register
// @route   POST /api/users
// @access  public

const registerUser = asyncHandler(async (req,res) => {
    const {name , email , password} = req.body

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id)

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
        
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// @desc    user logout and clean cookies
// @route   POST /api/users/logout
// @access  public

const logoutUser = (req,res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message: 'Logged out successfully'})
}

// @desc    get user profile
// @route   GET /api/users/profile
// @access  private

const getUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const updateUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }


        const updatedUser = await user.save()

        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        })
        
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    get all users
// @route   GET /api/users
// access   Private/ Admin

const getUsers = asyncHandler(async (req,res) => {
    const users = await User.find({}).select('-password')
    res.json(users)
})

// @desc    delete user
// @route   DELETE / api / user / :id
// @access  Private / Admin

const deleteUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        if (user.isAdmin) {
            res.status(400)
            throw new Error('Can not delete admin user')   
        }
        await user.deleteOne({id:user._id})
        res.json({message:'User removed'})
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    get user by ID
// @route   GET /api/users/ :id
// @access  Private / Admin
const getUserById = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id).select('-passwrod')

    if (user) {
        res.json(user)
        
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    update user
// @route   PUT /api/users/:id
// @access  Private / Admin
const updateUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.param.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)

        const updateUser = await user.save()

        res.json({
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}






