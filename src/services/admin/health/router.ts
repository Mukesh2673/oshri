import { Request, Response } from "express";
export default [
  
  {
    path: "/health",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const result = 'working';
        res.status(200).send(result);
      },
    ],
  },

];
