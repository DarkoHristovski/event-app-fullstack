const User = require('../models/users');

const createUser = async (req, res) => {
  try {
    const newUser = await User.create({ ...req.body});
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    // const User = await User.findById(id) //return User object
    const users = await User.find({ _id: id })
    if (users.length === 0) {
      res.status(404).json({ message: `User with id ${id} Not Found` });
    } else {
      res.json(users[0]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    // const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    const updatedUser = await User.findOneAndUpdate({ _id: id }, req.body, { new: true }); // { new: true } return the new updated doc in the db

    if (!updatedUser) {
      res.status(404).json({ message: `User with id ${id} Not Found` });
    } else {
      res.json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // const deletedUser = await User.findByIdAndDelete(id );
    const deletedUser = await User.findOneAndDelete({ _id: id });

    if (!deletedUser) {
      res.status(404).json({ message: `User with id ${id} Not Found` });
    } else {
      res.json(deletedUser);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser}