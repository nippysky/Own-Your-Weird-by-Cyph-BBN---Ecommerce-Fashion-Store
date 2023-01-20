import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../mongodb/connection";
import User from "../../../mongodb/schema";
import { hash } from "bcryptjs";

type RegisterForm = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dAddress: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await db.connect();

  // Only POST Method is accepted
  if (req.method === "POST") {
    if (!req.body) {
      return res.status(404).json({ error: "Don't have form data!" });
    }

    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      dAddress,
      password,
    }: RegisterForm = req.body;

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.status(200).json({ message: "Already Registered" });
      return;
    }

    //  Create Users
    await User.insertMany({
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      dAddress: dAddress,
      password: await hash(password, 12),
    });

    res.send({ message: "Seeded Succesfully" });
  }
}
