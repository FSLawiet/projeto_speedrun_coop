import { db } from "../lib/connect";
import { Usuario } from "../models/usuario";

export const usuariosList = async (): Promise<Usuario[]> => {
  return db
    .query(`SELECT id, firstName, lastName, userName, email FROM usuario;`)
    .then((usuarios: Usuario[]) => {
      let response = [];
      for (let usuario of usuarios) {
        response.push(
          new Usuario(
            usuario.firstName,
            usuario.lastName,
            usuario.userName,
            usuario.email,
            usuario.id
          )
        );
      }
      return response;
    });
};

export const usuariosListById = async (id: number): Promise<Usuario> => {
  return db
    .one(
      `SELECT id, firstName, lastName, userName, email FROM usuario WHERE id = ${id};`
    )
    .then((usuario: Usuario) => {
      return new Usuario(
        usuario.firstName,
        usuario.lastName,
        usuario.userName,
        usuario.email,
        usuario.id
      );
    });
};

export const usuariosListByEmail = async (
  username: string
): Promise<Usuario> => {
  return db
    .one(`SELECT * FROM usuario WHERE username = ${username};`)
    .then((usuario: Usuario) => {
      return new Usuario(
        usuario.firstName,
        usuario.lastName,
        usuario.userName,
        usuario.email,
        usuario.id,
        usuario.pwd
      );
    });
};

export const usuariosInsert = async (
  usuario: Usuario
): Promise<{ id: number }> => {
  return db
    .one(
      `INSERT INTO usuario (firstName, lastName, userName, email, pwd) VALUES ('${usuario.firstName}', '${usuario.lastName}', '${usuario.userName}', '${usuario.email}', '${usuario.pwd}') RETURNING id;`
    )
    .then((id: { id: number }) => {
      return id;
    });
};
