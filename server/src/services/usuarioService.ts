import {
  usuariosInsert,
  usuariosList,
  usuariosListByEmail,
  usuariosListById,
} from "../data/usuariosData";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario";
export const getUsuarios = async (): Promise<Usuario[]> => {
  return await usuariosList();
};
export const getUsuariosById = async (id: string): Promise<Usuario> => {
  const numericId = parseInt(id);
  if (!numericId) throw new Error("Identificador único inválido.");
  return usuariosListById(numericId);
};

export const postUsuarios = async (
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  pwd: string
): Promise<{ id: number } | any> => {
  const hash = await bcrypt.hash(pwd, 12);
  if (await bcrypt.compare(pwd, hash))
    return await usuariosInsert(
      new Usuario(firstName, lastName, userName, email, undefined, hash)
    );
  /*
  bcrypt
    .hash(senha, 12)
    .then(async (hash) => {
      bcrypt
        .compare(senha, hash)
        .then(async (res) => {
          return await usuariosInsert(new Usuario(username, hash));
        })
        .catch((error) => {
          throw new Error("Erro na qualificação da senha do usuário.");
        });
    })
    .catch((error) => {
      throw new Error("Erro na encriptação da senha do usuário.");
    });
    */
};
export const usuarioLogin = async (
  userName: string,
  pwd: string,
  time_limit: boolean
) => {
  const user = await usuariosListByEmail(userName);
  if (!user) throw new Error("Email not found");
  else if (user.pwd && !bcrypt.compare(pwd, user.pwd))
    throw new Error("Passwords does not match");
  //   create JWT token

  const token = jwt.sign(
    {
      userId: user.id,
      userUsername: user.userName,
    },
    process.env.SESSION_SECRET,
    { expiresIn: time_limit ? `${30 * 24}h` : "24h" }
  );

  return {
    message: "Login Successful",
    userInfo: new Usuario(
      user.firstName,
      user.lastName,
      user.userName,
      user.email,
      user.id
    ),
    token,
  };
};
