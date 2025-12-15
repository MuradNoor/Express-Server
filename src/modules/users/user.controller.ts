import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async(req: Request, res: Response) => {
  try{
    const result = await userService.createUser(req.body)
       res.status(201).json({
      success: true,
      message: "data inserted successfully...",
      data: result.rows[0]
    })
  }catch(err : any){
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
};

const getAllUsers = async(req: Request, res: Response) => {
  try{
    const result = await userService.getAllUsers();

      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: result.rows
      });

  }catch(err : any){
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
};

const getSingleUser = async(req: Request, res: Response) => {
  try {
    const result = await userService.getSingleUser(req.params.id!)

      if(result.rows.length === 0){
        res.status(404).json({
          success: false,
          message: "User Not Found"
        })
      }else{
        res.status(200).json({
          success: true,
          message: "User Fetched successfully",
          data: result.rows[0]
        })
      }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
};

const getUpdateUser = async(req: Request, res: Response) => {
  const {name, email} = req.body;
  try {
    const result = await userService.getUpdateUser(name, email, req.params.id!)
      if(result.rows.length === 0){
        res.status(404).json({
          success: false,
          message: "User Not Found"
        })
      }else{
        res.status(200).json({
          success: true,
          message: "User updated successfully",
          data: result.rows[0]
        })
      }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
};

const deleteUser = async(req: Request, res: Response) => {
  try {
    const result = await userService.deleteUser(req.params.id!)
      if(result.rowCount === 0){
        res.status(404).json({
          success: false,
          message: "User Not Found"
        })
      }else{
        res.status(200).json({
          success: true,
          message: "User deleted successfully",
          data: result.rows
        })
      }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
};

export const usersController = {
    createUser,
    getAllUsers, 
    getSingleUser, 
    getUpdateUser,
    deleteUser
};