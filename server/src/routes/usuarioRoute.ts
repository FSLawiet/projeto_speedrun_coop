/**
 * @openapi
 * components:
 *   schemas:
 *     Usuário:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único do usuário.
 *           example: 1
 *         username:
 *           type: string
 *           description: Nome de usuário.
 *           example: robson567
 *         password:
 *           type: string
 *           description: Senha do usuário.
 *           example: 12345678
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Descrição do erro.
 *           example: Error message.
 *
 * tags:
 *   name: Usuários
 *   description: Usuários do sistema.
 *
 * paths:
 *   /users:
 *     get:
 *       tags: [Usuários]
 *       summary: Requisição de usuários.
 *       description: Requisitar todos os usuários do sistema.
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Usuário'
 *         404:
 *           description: Error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *     post:
 *       tags: [Usuários]
 *       summary: Registro de usuários.
 *       description: Registra um usuário no sistema.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuário'
 *       responses:
 *         201:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Identificador único do usuário cadastrado.
 *                     example: 1
 *
 *   /users/{userId}:
 *     get:
 *       tags: [Usuários]
 *       summary: Requisição de usuário.
 *       description: Requisitar um usuário do sistema.
 *       parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *           description: Identificador numérico único do usuário.
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Usuário'
 *         404:
 *           description: Error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *
 */

import { Express, Request, Response } from "express";
import {
  getUsuarios,
  getUsuariosById,
  postUsuarios,
  usuarioLogin,
} from "../services/usuarioService";
import { auth } from "../lib/auth";

export const usuarioRoute = (server: Express) => {
  server
    .route("/users")
    .get(auth, async (req: Request, res: Response) => {
      try {
        res.status(200).json(await getUsuarios());
      } catch (error: any) {
        res.status(404).json({ error: error.message });
      }
    })
    .post(async (req: Request, res: Response) => {
      const { firstName, lastName, userName, email, pwd } = req.body;
      try {
        const resp = await postUsuarios(
          firstName,
          lastName,
          userName,
          email,
          pwd
        );
        console.log(resp);
        res.status(201).json(resp);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    });
  server.route("/users/:id").get(auth, async (req: Request, res: Response) => {
    try {
      res.status(200).json(await getUsuariosById(req.params.id));
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  });
  server.route("/login").post(async (req: Request, res: Response) => {
    const { userName, pwd, time_limit } = req.body;
    try {
      res
        .status(201)
        .json(await usuarioLogin(userName, pwd, time_limit ? true : false));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });
};
