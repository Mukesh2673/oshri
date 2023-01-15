import { Request, Response } from "express";
import {
  addReview,
  getReviewList,
  deleteReview,
  updateReview
} from "./controller";
import config from "config";
import { checkAuthenticate } from "../auth/middleware/check";

const basePath = config.get("BASE_PATH");
const currentPath = "admin/review";
const currentPathURL = basePath + currentPath;


export default [

  //  add Review  //
  {
    path: currentPathURL,
    method: "post",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await addReview(req.get(config.get('AUTHORIZATION')), req);
        res.status(200).send(result);
      }
    ]
  },

  //  get Reviews List  // 
  {
    path: currentPathURL,
    method: "get",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await getReviewList(req.get(config.get('AUTHORIZATION')), req.query);
        res.status(200).send(result);
      }
    ]
  },

  //  delete Review  //
  {
    path: currentPathURL + '/:id',
    method: "delete",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await deleteReview(req.params.id);
        res.status(200).send(result);
      }
    ]
  },

  //  update Review  //
  {
    path: currentPathURL + '/:id',
    method: "put",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await updateReview(req.get(config.get('AUTHORIZATION')), req.params.id, req.body);
        res.status(200).send(result);
      }
    ]
  },
];
