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
// pegar todos os usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await usersRepository.getUsers();
    // verificacao se tem usuarios cadastrados
    if (!users) {
      return res.status(404).send({ message: "Não há usuários cadastrados" });
    }
    return res.status(200).send({ totalUsers: users.length, users });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar usuários", error: error.message });
  }
}
// pegar usuario por id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await usersRepository.getUserById(id);
    // verificacao se usuario existe
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    return res.status(200).send({ message: "Usuário encontrado", user });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar usuário", error: error.message });
  }
};
// pegar usuario por nome
export const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;

    const user = await usersRepository.getUserByName(name);
    // verificacao se usuario existe
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
// criar usuario
export const createUser = async (req, res) => {
  try {
    const { name, cnpj, tel, password } = req.body;

    const userAlreadyExistsCnpj = await usersRepository.getUserByCnpj(cnpj);
    const userAlreadyExistsName = await usersRepository.getUserByName(name);
    const userAlreadyExistsTel = await usersRepository.getUserByTel(tel);
    // verificacao se usuario ja existe usando o cnpj unico
    if (userAlreadyExistsCnpj) {
      return res.status(409).send({ message: "Cnpj já cadastrado" });
    }
    // verificacao se usuario ja existe usando o nome unico
    if (userAlreadyExistsName) {
      return res.status(409).send({ message: "Nome já cadastrado" });
    }
    // verificacao se usuario ja existe usando o telefone unico
    if (userAlreadyExistsTel) {
      return res.status(409).send({ message: "Telefone já cadastrado" });
    }
    // validacao do cnpj
    if (!validateCnpj(cnpj)) {
      return res.status(400).send({ message: "Cnpj inválido" });
    }
    // hash na senha
    const passwordHash = await hash(password, 8);

    const user = new User(name, formatCnpj(cnpj), tel, passwordHash);

    await usersRepository.createUser(user);

    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar usuário", error: error.message });
  }
};
// atualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cnpj, password } = req.body;

    const userById = await usersRepository.getUserById(id);
    const userByCnpj = await usersRepository.getUserByCnpj(cnpj);
    // verificacao se usuario existe
    if (!userById) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    // verificacao se cnpj ja esta cadastrado
    if (userByCnpj && userByCnpj.id !== id) {
      return res.status(409).send({ message: "Cnpj já cadastrado" });
    }
    // hash na senha
    const passwordHash = await hash(password, 8);

    const user = await usersRepository.updateUser(id, name, cnpj, passwordHash);

    return res
      .status(200)
      .send({ message: "Usuário atualizado com sucesso", user });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar usuário", error: error.message });
  }
};
// deletar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await usersRepository.getUserById(id);
    // verificacao se usuario existe
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
// login
export const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await usersRepository.getUserByName(name);
    // verificacao se usuario existe pelo nome
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    // comparacao de senha com hash
    const passwordMatch = await compare(password, user.password);
    // se tiver erro na senha retorna isso
    if (!passwordMatch) {
      return res.status(401).send({ message: "Nome ou senha inválidos" });
    }
    // geracao do acess token
    const token = sign({}, 'ca94e53c-e4e7-422a-9558-f32670cce6a5', {
      subject: user.id,
      expiresIn: '15m'
    });
    // geracao do refresh token
    const generateRefreshToken = new Refresh(user.id);
    const refreshToken = await refreshRepository.createRefreshToken(generateRefreshToken);

    return res.status(200).send({ user, token: token, refreshToken });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao realizar login", error: error.message });
  }
};
// login automatico (refersh)
export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const token = await refreshRepository.getRefreshToken(refreshToken);
    // verificacao se token existe
    if (!token) {
      return res.status(404).send({ message: "Token inválido ou expirado" });
    }
    // geracao de novo acess token
    const newToken = sign({}, 'ca94e53c-e4e7-422a-9558-f32670cce6a5', {
      subject: token.user_id,
      expiresIn: '15m'
    });

    return res.status(200).send({ token: newToken, user_id: token.user_id });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao realizar refresh", error: error.message });
  }
};
// adicionar endereco no usuario
export const addAddressOnUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { cep, street, number, complement, city, state } = req.body;

    const user = await usersRepository.getUserById(userId);
    // verificacao se usuario existe
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const freight = city.toLowerCase() == 'valinhos' ? 'CIF' : 'FOB';
    // objeto endereco
    const address = {
      cep,
      street,
      number,
      complement,
      city,
      state,
      freight
    }

    await usersRepository.addAddressOnUser(userId, address);

    return res.status(200).send({ message: "Endereço adicionado com sucesso", address });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao adicionar endereço", error: error.message });
  }
};
// pegar endereco pelo id do usuario
export const getAddressByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await usersRepository.getUserById(userId);
    // verificacao se usuario existe
    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const address = await usersRepository.getAddressByUserId(userId);
    // verificacao se usuario tem endereco
    if (!address) {
      return res.status(404).send({ message: "Usuário não possui endereço cadastrado" });
    }

    return res.status(200).send({ message: "Endereço encontrado", address });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar endereço", error: error.message });
  }
};
// atualizar endereco
export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { cep, street, number, complement, city, state } = req.body;

    const freight = city.toLowerCase() == 'valinhos' ? 'CIF' : 'FOB';

    const address = {
      cep,
      street,
      number,
      complement,
      city,
      state,
      freight
    };

    await usersRepository.updateAddressOnUser(id, address);

    return res.status(200).send({ message: "Endereço atualizado com sucesso", address });

  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar endereço", error: error.message });
  };
};
// deletar endereco
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await usersRepository.getAddressById(id);
    // verificacao se endereco existe
    if (!address) {
      return res.status(404).send({ message: "Endereço não encontrado" });
    }

    await usersRepository.deleteAddress(id);

    return res.status(200).send({ message: "Endereço deletado com sucesso", address });

  } catch (error) {
    return res.status(500).send({ message: "Erro ao deletar endereço", error: error.message });
  }
};