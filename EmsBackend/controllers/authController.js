import Employee from "../models/Employee.js";

// Simple login (email + password)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Employee.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { password: pwd, ...userData } = user._doc;

    res.status(200).json(userData);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

