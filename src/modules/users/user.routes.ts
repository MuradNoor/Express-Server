import {Router} from "express";
import { usersController } from "./user.controller";
import auth from "../../Middleware/auth";

const router = Router();


// here root ---> "/users"
router.post("/", usersController.createUser);

router.get("/", auth("admin"), usersController.getAllUsers);

router.get("/:id", usersController.getSingleUser);

router.put("/:id", usersController.getUpdateUser);

router.delete("/:id", usersController.deleteUser);

export const usersRoutes = router;