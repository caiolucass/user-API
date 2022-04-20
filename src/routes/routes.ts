import { Router } from "express";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { CreateComplimentController } from "../controllers/CreateComplimentController";
import { CreateTagController } from "../controllers/CreateTagController";
import { CreateUserController } from "../controllers/CreateUserController";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const router = Router();
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

/**
 * Rotas da aplicacao
 * middlware na rota para verificar 
 * se o usuario possui perfil de admin
 */
 router.post("/tags", ensureAdmin, createTagController.handle);
 router.post("/users", createUserController.handle);
 router.post("/login", authenticateUserController.handle);
 router.post("/compliments", createComplimentController.handle);

export {router};