// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next/types";
import axios from "axios";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!req.headers.authorization)
		return res.status(401).json({
			success: false,
			errors: [
				{ name: "UnauthorizedError", message: "Authorization failed." }
			]
		});
  axios
    .get("http://authsys.tamcreates.com/api/v1/auth/whoami", {
      headers: {
        Authorization: `Bearer ${req.headers.authorization}`
      }
    })
    .then((response) => {
      return res.status(response.status).json(response.data);
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        data: {},
        errors: [err],
        message: err.message
      });
    });
}
