import { NextApiRequest, NextApiResponse } from "next";
import db from "../../mongodb/connection";
import User from "../../mongodb/schema";

type OrderedItems = {
  email: string;
  items: object[];
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

    const { email, items }: OrderedItems = req.body;

    // Get Current Date
    const date = new Date();
    const currentDate = `${date}`;

    // Push Order Details
    const addOrder = () => {
      User.findOneAndUpdate(
        { email: email },
        { $push: { orders: { date: currentDate, order: [...items] } } },
        { useFindAndModify: false },
        (err) => {
          if (err) {
            console.log(err);
          }
          console.log("Order Created Successfully");
        }
      );
    };
    addOrder();

    return res.send({ message: "Seeded Succesfully" });
  }
}
