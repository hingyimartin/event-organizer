import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '5m',
    }
  );
};

export const generateRefreshToken = (user) => {
  console.log(
    'Generating token with secret:',
    process.env.REFRESH_TOKEN_SECRET
  );
  return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token) => {
  console.log('Using secret:', process.env.REFRESH_TOKEN_SECRET);
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};
