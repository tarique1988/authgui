// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next/types";
import axios from "axios";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  return axios
    .get("http://authsys.tamcreates.com/api/v1/auth/whoami", {
      headers: {
        Authorization: `Bearer ${req.headers.authorization}`
      }
    })
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        data: {},
        errors: [err],
        message: err.message
      });
    });
}
