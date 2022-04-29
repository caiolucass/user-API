import { Router } from "express";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { CreateComplimentController } from "../controllers/CreateComplimentController";
import { CreateTagController } from "../controllers/CreateTagController";
import { CreateUserController } from "../controllers/CreateUserController";
import { ListTagController } from "../controllers/ListTagController";
import { ListUserReceiveComplimentsController } from "../controllers/ListUserReceiveController";
import { ListUsersController } from "../controllers/ListUsersController";
import { ListUserSendComplimentsController } from "../controllers/ListUserSendController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const router = Router();
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagController();
const listUsersController = new ListUsersController();

/**
 * Rotas da aplicacao
 * middlware na rota para verificar 
 * se o usuario possui perfil de admin
 */
 router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
 router.post("/users", createUserController.handle);
 router.post("/login", authenticateUserController.handle);
 router.post("/compliments", ensureAuthenticated, createComplimentController.handle);
 router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle);
 router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle);
 router.get("/tags", ensureAuthenticated, listTagsController.handle);
 router.get("/users", ensureAuthenticated, listUsersController.handle);

export {router};