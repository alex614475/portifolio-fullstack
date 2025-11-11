import User from "../models/userModel.js";
export const createUser = async (req, res) => {
  const userToCreate = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const user = await User.create(userToCreate);
};

export const getAllUser = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
};

export const updateUser = (req, res) => {
  res.status(200).json({ message: "Deu bom" });
};

export const deleteUser = (req, res) => {
  res.status(200).json({ message: "Deu bom" });
};
