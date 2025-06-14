export const signUp = async (req, res) => {
  await res.status(200).json({ message: 'Sign Up endpoint hit' });
};

export const login = async (req, res) => {
  await res.status(200).json({ message: 'Login endpoint hit' });
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
