import { Request, Response } from "express";
import { addProfile,getProfileList } from "./controller";
/* import {
  addLocation,
  getLocationList,
  updateLocation,
  deleteLocation,
  updateLocationStatus
  // deleteCategory,
  // updateCategory,
  // getCategoryById,
  // getCategoryDropdown
} from "./controller"; */
import config from "config";
import { checkAuthenticate } from "../../admin/auth/middleware/check";

const basePath = config.get("BASE_PATH");
const currentPath = "admin/auth/profile";
const currentPathURL = basePath + currentPath;

export default [

  //  add profile //
   {
    path: currentPathURL,
    method: "post",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await addProfile(req.get(config.get('AUTHORIZATION')), req);
        res.status(200).send(result);
      }
    ]
  },

  //  get profile  // 
   {
    path: currentPathURL,
    method: "get",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await getProfileList(req.get(config.get('AUTHORIZATION')), req.query);
        res.status(200).send(result);
      }
    ]
  }, 

    //delete Location  
/*    {
     path: currentPathURL + '/:id',
     method: "delete",
     handler: [
       checkAuthenticate,
       async (req: Request, res: Response) => {
         const result = await deleteLocation(req.params.id);
         res.status(200).send(result);
       }
     ]
   }, */

  //  update Category  //
 /*   {
     path: currentPathURL + '/:id',
    method: "put",
     handler: [
       checkAuthenticate,
       async (req: Request, res: Response) => {
         const result = await updateLocation(req.get(config.get('AUTHORIZATION')), req.params.id, req.body);
         res.status(200).send(result);
       }
     ]
  }, */


/*   {
    path: currentPathURL + "/status/:id",
   method: "put",
    handler: [
      checkAuthenticate,
      async (req: Request, res: Response) => {
        const result = await updateLocationStatus(req.get(config.get('AUTHORIZATION')), req.params.id);
        res.status(200).send(result);
      }
    ]
 } */






  // },

  //  Get category by Id  //
  // {
  //   path: currentPathURL + '/:id',
  //   method: "get",
  //   handler: [
  //     checkAuthenticate,
  //     async (req: Request, res: Response) => {
  //       const result = await getCategoryById(req.get(config.get('AUTHORIZATION')), req.params.id);
  //       res.status(200).send(result);
  //     }
  //   ]
  // },

  //  Category Dropdown  //
  // {
  //   path: currentPathURL + '/dropDown',
  //   method: "get",
  //   handler: [
  //     checkAuthenticate,
  //     async (req: Request, res: Response) => {
  //       const result = await getCategoryDropdown(req.get(config.get('AUTHORIZATION')), req.query);
  //       res.status(200).send(result);
  //     }
  //   ]
  // },
];
