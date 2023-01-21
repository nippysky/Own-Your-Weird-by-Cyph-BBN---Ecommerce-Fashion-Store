import { NextApiRequest, NextApiResponse } from "next";
import db from "../../mongodb/connection";
import User from "../../mongodb/schema";
import { hash } from "bcryptjs";

type EditProfile = {
  email: string;
  firstName: string;
  lastName: string;
  dAddress: string;
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

    const { email, firstName, lastName, dAddress }: EditProfile = req.body;

    //  Edit Profile Details
    const EditProfile = () => {
      User.findOneAndUpdate(
        { email: email },
        { firstName: firstName, lastName: lastName, dAddress: dAddress },
        { useFindAndModify: false },
        (err) => {
          if (err) {
            console.log(err);
          }
          console.log("Edit Profile Successfully");
        }
      );
    };
    EditProfile();

    return res.send({ message: "Seeded Succesfully" });
  }
}
