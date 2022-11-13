import express, { Express, Request, Response } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { usuarioRoute } from "./routes/usuarioRoute";
import dotenv from "dotenv";

dotenv.config();

const server: Express = express();
const port = process.env.PORT;

server.use(express.json());
server.use((req: Request, res: Response, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
usuarioRoute(server);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Speedrun Club",
      version: "0.1.0",
      description: "descrição e papapa",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "F. S. Lawliet",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
        description: "Development Server",
      },
      {
        url: "https://hoshi-api.herokuapp.com/",
        description: "Production Server",
      },
    ],
  },
  apis: ["src/routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, { explorer: true })
);
server.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

server.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
