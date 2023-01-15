import { Request, Response } from "express";
import {
  addCategory,
  getCategoryList,
  deleteCategory,
  updateCategory,
  getCategoryById,
  getCategoryDropdown
} from "./controller";
import config from "config";
import { checkAuthenticate } from "../../admin/auth/middleware/check";
// import { validate } from './middleware/check';

const basePath = config.get("BASE_PATH");
const currentPath = "category";
const currentPathURL = basePath + currentPath;


export default [

  //  add Category  //
  {
    path: currentPathURL,
    method: "post",
    handler: [
      checkAuthenticate,
      // validate,
      async (req: Request, res: Response) => {
        const result = await addCategory(req.get(config.get('AUTHORIZATION')), req);
        res.status(200).send(result);
      }
    ]
  },

  //  get Category List  // 
  {
    path: currentPathURL,
    method: "get",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await getCategoryList(req.get(config.get('AUTHORIZATION')), req.query);
        res.status(200).send(result);
      }
    ]
  },

  //  delete Category  //
  {
    path: currentPathURL + '/:id',
    method: "delete",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await deleteCategory(req.params.id);
        res.status(200).send(result);
      }
    ]
  },

  //  update Category  //
  {
    path: currentPathURL + '/:id',
    method: "put",
    handler: [
      checkAuthenticate,
      // validate,
      async (req: Request, res: Response) => {
        const result = await updateCategory(req.get(config.get('AUTHORIZATION')), req.params.id, req.body);
        res.status(200).send(result);
      }
    ]
  },

  //  Get category by Id  //
  {
    path: currentPathURL + '/:id',
    method: "get",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await getCategoryById(req.get(config.get('AUTHORIZATION')), req.params.id);
        res.status(200).send(result);
      }
    ]
  },

  //  Category Dropdown  //
  {
    path: currentPathURL + '/dropDown',
    method: "get",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await getCategoryDropdown(req.get(config.get('AUTHORIZATION')), req.query);
        res.status(200).send(result);
      }
    ]
  },
];
