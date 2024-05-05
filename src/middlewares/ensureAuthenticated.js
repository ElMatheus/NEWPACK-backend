import jwt from 'jsonwebtoken';
const { verify } = jwt;

export const ensureAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: "Token não autorizado" });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    verify(token, 'ca94e53c-e4e7-422a-9558-f32670cce6a5');

    return next();
  } catch (error) {
    return res.status(401).send({ message: "Token inválido" });
  }
}