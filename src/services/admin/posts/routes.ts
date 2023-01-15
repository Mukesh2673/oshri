import { Request, Response } from "express";
import {
  addPosts,
  getPostList,
  deletePost,
  updatePost,
  getPostById,
  // getCategoryDropdown
} from "./controller";
import config from "config";
import { checkAuthenticate } from "../../admin/auth/middleware/check";

const basePath = config.get("BASE_PATH");
const currentPath = "admin/posts";
const currentPathURL = basePath + currentPath;


export default [

  //  add post  //
  {
    path: currentPathURL,
    method: "post",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await addPosts(req.get(config.get('AUTHORIZATION')), req);
        res.status(200).send(result);
      }
    ]
  },

  //  get post List  // 
  {
    path: currentPathURL,
    method: "get",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await getPostList(req.get(config.get('AUTHORIZATION')), req.query);
        res.status(200).send(result);
      }
    ]
  },

  //  delete deletePost 
  {
    path: currentPathURL + '/:id',
    method: "delete",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await deletePost(req.params.id);
        res.status(200).send(result);
      }
    ]
  },

  //  update post  //
  {
    path: currentPathURL + '/:id',
    method: "put",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await updatePost(req.get(config.get('AUTHORIZATION')), req.params.id, req);
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
        const result = await getPostById(req.get(config.get('AUTHORIZATION')), req.params.id);
        res.status(200).send(result);
      }
    ]
  },
];
