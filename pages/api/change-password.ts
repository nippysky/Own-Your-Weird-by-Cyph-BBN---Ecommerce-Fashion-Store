import { NextApiRequest, NextApiResponse } from "next";
import db from "../../mongodb/connection";
import User from "../../mongodb/schema";
import { hash } from "bcryptjs";

type PasswordData = {
  email: string;
  newPassword: string;
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

    const { email, newPassword }: PasswordData = req.body;

    //  Change Password
    const ChangePassword = async () => {
      User.findOneAndUpdate(
        { email: email },
        { password: await hash(newPassword, 12) },
        { useFindAndModify: false },
        (err) => {
          if (err) {
            console.log(err);
          }
          console.log("Password Changed Successfully");
        }
      );
    };
    ChangePassword();

    res.send({ message: "Seeded Succesfully" });
  }
}
