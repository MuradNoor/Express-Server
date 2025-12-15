import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";
import logger from "./Middleware/logger";
import { usersRoutes } from "./modules/users/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
const port = config.port;

// parser
app.use(express.json());
// app.use(express.urlencoded());

// initializing DB
initDB();

app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello Next Level Developers!');
});

//*Users CURD operations 
app.use("/users", usersRoutes);

// todos crud
app.use("/todos", todoRoutes);

//? auth routes
app.use("/auth", authRoutes);

//! route not found
app.use((req: Request, res:Response) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    path: req.path
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});