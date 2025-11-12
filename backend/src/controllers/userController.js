import User from "../database/models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar usuário", error: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao listar usuários", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, { where: { id } });

    if (!updated)
      return res.status(404).json({ message: "Usuário não encontrado" });

    const user = await User.findByPk(id);
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar usuário", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });

    if (!deleted)
      return res.status(404).json({ message: "Usuário não encontrado" });

    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar usuário", error: error.message });
  }
};
