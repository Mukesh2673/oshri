import { Request, Response } from "express";
import {
  addPriceCatalog,
  getPriceCatalogList,
  deletePriceCatalog,
  updatePriceCatalog,
  // getCategoryById,
  // getCategoryDropdown
} from "./controller";
import config from "config";
import { checkAuthenticate } from "../auth/middleware/check";

const basePath = config.get("BASE_PATH");
const currentPath = "admin/priceCatalog";
const currentPathURL = basePath + currentPath;


export default [

  //  add PriceCatalog  //
  {
    path: currentPathURL,
    method: "post",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await addPriceCatalog(req.get(config.get('AUTHORIZATION')), req);
        res.status(200).send(result);
      }
    ]
  },

  //  get PriceCatalog List  // 
  {
    path: currentPathURL,
    method: "get",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await getPriceCatalogList(req.get(config.get('AUTHORIZATION')), req.query);
        res.status(200).send(result);
      }
    ]
  },

  //  delete PriceCatalog  //
  {
    path: currentPathURL + '/:id',
    method: "delete",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await deletePriceCatalog(req.params.id);
        res.status(200).send(result);
      }
    ]
  },

  //  update PriceCatalog  //
  {
    path: currentPathURL + '/:id',
    method: "put",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await updatePriceCatalog(req.get(config.get('AUTHORIZATION')), req.params.id, req.body);
        res.status(200).send(result);
      }
    ]
  },
];
