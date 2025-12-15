import { Request, Response } from "express";
import { todoService } from "./todo.service";

const createTodo = async(req: Request, res: Response) => {
    const {user_id, title} = req.body;

  try{
    const result = await todoService.createTodo(user_id, title)
       res.status(201).json({
      success: true,
      message: "data inserted successfully...",
      data: result.rows[0]
    });
  }catch(err : any){
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
};

const getAllTodos = async(req: Request, res: Response) => {
  try{
    const result = await todoService.getAllTodos();

      res.status(200).json({
        success: true,
        message: "todos retrieved successfully",
        data: result.rows
      });

  }catch(err : any){
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
};

const getSingleTodo = async(req: Request, res: Response) => {
  try {
    const result = await todoService.getSingleTodo(req.params.id!)

      if(result.rows.length === 0){
        res.status(404).json({
          success: false,
          message: "Todo Not Found"
        })
      }else{
        res.status(200).json({
          success: true,
          message: "Todo Fetched successfully",
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

const updateTodo = async(req: Request, res: Response) => {
  const {title} = req.body;
  try {
    const result = await todoService.updateTodo(title, req.params.id!)

      if(result.rows.length === 0){
        res.status(404).json({
          success: false,
          message: "Todo Not Found"
        })
      }else{
        res.status(200).json({
          success: true,
          message: "Todo updated successfully",
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

const deleteTodo = async(req: Request, res: Response) => {
  try {
    const result = await todoService.deleteTodo(req.params.id!)
      if(result.rowCount === 0){
        res.status(404).json({
          success: false,
          message: "Todo Not Found"
        })
      }else{
        res.status(200).json({
          success: true,
          message: "todo deleted successfully",
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

export const todoController = {
    createTodo,
    getAllTodos,
    getSingleTodo,
    updateTodo,
    deleteTodo
};