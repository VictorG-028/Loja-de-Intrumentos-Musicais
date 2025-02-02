import { Router as ExpreessRouter, Request, Response } from 'express';
import Controller from "../interfaces/Controller";

export default class UserController implements Controller {

  createUser(req: Request, res: Response) {
    const { name, email } = req.body;


    console.log("User created!");
  }
}

