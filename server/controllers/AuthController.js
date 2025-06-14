import bcrypt from 'bcrypt';
import UserModel from '../models/UserModel.js';

import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/TokenHelper.js';

export const signUp = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // check if username exists
    const checkedUsername = await UserModel.findOne({ username });
    if (checkedUsername) {
      return res.status(400).json({
        message: 'Username already taken',
      });
    }

    // check if email exists
    const checkedEmail = await UserModel.findOne({ email });
    if (checkedEmail) {
      return res.status(400).json({
        message: 'Email already taken',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    if (!user) {
      res.status(500).json({ message: 'Error creating user' });
    }

    res.status(201).json({
      message: 'User created successfuly',
    });
  } catch (error) {
    res.status(500).json({
      message: `${
        process.env.NODE_ENV === 'development' ? error : 'Unexpected error'
      }`,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { identification, password } = req.body;
    console.log(identification, password);

    if (!identification || !password) {
      return res
        .status(400)
        .json({ message: 'Username/email and password required' });
    }

    let user;

    if (identification.includes('@')) {
      // email alapján keresés
      user = await UserModel.findOne({ email: identification });
    } else {
      // username alapján keresés
      user = await UserModel.findOne({ username: identification });
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Username/email or password incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: 'Username/email or password incorrect' });
    }

    // generate access token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      accessToken,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      message: `${
        process.env.NODE_ENV === 'development'
          ? error
          : 'An unexpected error happened'
      }`,
    });
  }
};

export const logout = async (req, res) => {
  await res.status(200).json({ message: 'Logout endpoint hit' });
};

export const getMe = async (req, res) => {
  await res.status(200).json({ message: 'Get me endpoint hit' });
};

export const refreshAccessToken = async (req, res) => {
  await res.status(200).json({ message: 'Refresh access token endpoint hit' });
};
