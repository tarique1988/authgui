// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next/types";
import axios from "axios";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  const body = { email: email, password: password };

  return axios
		.post("https://authsys.tamcreates.com/api/v1/auth/login", body, {
			headers: { "content-type": "application/json" }
		})
		.then((response) => {
			res.status(200).json(response.data);
		})
		.catch((err) => {
			res.status(401).json({
				success: false,
				data: {},
				errors: [err],
				message: err.message
			});
		});
}
