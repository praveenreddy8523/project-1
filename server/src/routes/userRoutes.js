import { Router } from "express";
import {userController} from "../controllers/userController.js"

const router = Router();

    router.get("/GetUsers", userController.getAllUsers);
    router.get("/validateUser", userController.validateUserCreds);
    router.post("/AddUser",userController.addUser);

//router.get("/:id", userController.getUser);
//router.post("/", userController.createUser);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

export default router;
