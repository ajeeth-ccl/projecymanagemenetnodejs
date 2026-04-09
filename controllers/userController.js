const service = require("../services/userService");

// REGISTER
exports.register = async (req, res) => {
  try {
    const user = await service.registerUser(req.body);
    res.status(201).json({ user });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(400).json({ message: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const result = await service.loginUser(req.body);
    res.json(result);
  } catch (err) {
    console.error("Login Error:", err.message);
    if(err.message = "account is deactivated contact admin"){
      res.status(403).json({message:err.message})
    }
    res.status(400).json({ message: err.message });
  }
};

// GET USERS (protected route, use JWT middleware)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await service.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Get Users Error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
 
};
