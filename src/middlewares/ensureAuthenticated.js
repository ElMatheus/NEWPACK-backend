import jwt from 'jsonwebtoken';
const { verify } = jwt;

export const ensureAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: "Token não autorizado" });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    verify(token, process.env.SECRET_TOKEN);

    return next();
  } catch (error) {
    return res.status(401).send({ message: "Token inválido" });
  }
}