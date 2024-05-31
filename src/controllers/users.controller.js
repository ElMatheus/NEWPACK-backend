import { compare, hash } from "bcrypt";

import User from "../models/users/User.js";
import UsersRepository from "../models/users/UsersRepository.js";
import RefreshRepository from "../models/refreshToken/RefreshRepository.js";
import jwt from 'jsonwebtoken';
import Refresh from "../models/refreshToken/Refresh.js";
import validateCnpj from "../helpers/validateCnpj.js";
import formatCnpj from "../helpers/formatCnpj.js";
const { sign } = jwt;

const usersRepository = new UsersRepository();
const refreshRepository = new RefreshRepository();

export const getUsers = async (req, res) => {
  try {
    const users = await usersRepository.getUsers();

    if (!users) {
      return res.status(404).send({ message: "Não há usuários cadastrados" });
    }
    return res.status(200).send({ totalUsers: users.length, users });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar usuários", error: error.message });
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await usersRepository.getUserById(id);

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    return res.status(200).send({ message: "Usuário encontrado", user });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar usuário", error: error.message });
  }
};

export const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;

    const user = await usersRepository.getUserByName(name);

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    return res.status(200).send({
      message: "Usuário encontrado",
      user
    });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar usuário", error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, cnpj, password } = req.body;

    const userAlreadyExists = await usersRepository.getUserByCnpj(cnpj);

    if (userAlreadyExists) {
      return res.status(409).send({ message: "Usuário já cadastrado" });
    }

    if (!validateCnpj(cnpj)) {
      return res.status(400).send({ message: "Cnpj inválido" });
    }

    const passwordHash = await hash(password, 8);

    const user = new User(name, formatCnpj(cnpj), passwordHash);

    await usersRepository.createUser(user);

    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar usuário", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cnpj, password } = req.body;

    const userById = await usersRepository.getUserById(id);
    const userByCnpj = await usersRepository.getUserByCnpj(cnpj);

    if (!userById) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    if (userByCnpj && userByCnpj.id !== id) {
      return res.status(409).send({ message: "Cnpj já cadastrado" });
    }

    const passwordHash = await hash(password, 8);

    const user = await usersRepository.updateUser(id, name, cnpj, passwordHash);

    return res
      .status(200)
      .send({ message: "Usuário atualizado com sucesso", user });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar usuário", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await usersRepository.getUserById(id);

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    await usersRepository.deleteUser(id);

    return res
      .status(200)
      .send({ message: "Usuário deletado com sucesso", user });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao deletar usuário", error: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await usersRepository.getUserByName(name);

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: "Nome ou senha inválidos" });
    }

    const token = sign({}, 'ca94e53c-e4e7-422a-9558-f32670cce6a5', {
      subject: user.id,
      expiresIn: '15m'
    });

    const generateRefreshToken = new Refresh(user.id);
    const refreshToken = await refreshRepository.createRefreshToken(generateRefreshToken);

    return res.status(200).send({ user, token: token, refreshToken });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao realizar login", error: error.message });
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const token = await refreshRepository.getRefreshToken(refreshToken);

    if (!token) {
      return res.status(404).send({ message: "Token inválido ou expirado" });
    }

    const newToken = sign({}, 'ca94e53c-e4e7-422a-9558-f32670cce6a5', {
      subject: token.user_id,
      expiresIn: '15m'
    });

    return res.status(200).send({ token: newToken, user_id: token.user_id });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao realizar refresh", error: error.message });
  }
}