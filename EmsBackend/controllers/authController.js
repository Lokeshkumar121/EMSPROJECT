import Employee from "../models/Employee.js";

// Simple login (email + password)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Employee.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
     // Remove password before sending user data
    const { password: pwd, ...userData } = user._doc;

    res.status(200).json(userData);

    // res.json(user); // frontend can store token or user data
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
