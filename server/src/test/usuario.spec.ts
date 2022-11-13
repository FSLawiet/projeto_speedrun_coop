import { describe, expect, it } from "@jest/globals";
import { Usuario } from "../models/usuario";
import axios from "axios";

let id: number;

describe("Testes Usuários", () => {
  describe("Cadastro de Usuários", () => {
    it("Cadastro de um Usuário", async () => {
      const { data, status } = await axios.post<{ id: number }>(
        "http://localhost:3000/users",
        {
          username: "robson",
          password: "olocomeu",
        },
        {
          headers: {
            Accept: "application/json",
            //Authorization: "Bearer "
          },
        }
      );

      expect(status).toBe(201);
      expect(data).toHaveProperty("id");
      id = data.id;
    });
  });
  describe("Requisição de Usuários", () => {
    it("Requisição de todos os usuários", async () => {
      const { data, status } = await axios.get<Usuario[]>(
        "http://localhost:3000/users",
        {
          headers: {
            Accept: "application/json",
            //Authorization: "Bearer "
          },
        }
      );
      expect(status).toEqual(200);
      for (let usuario of data) {
        expect(usuario).toBeInstanceOf(Object);
        expect(usuario.id).toBeGreaterThanOrEqual(1);
      }
    });
    it("Requisição de um usuário", async () => {
      const { data, status } = await axios.get<Usuario>(
        `http://localhost:3000/users/${id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      expect(status).toEqual(200);
      expect(data).toBeInstanceOf(Object);
      expect(data.id).toBe(id);
    });
  });
});
