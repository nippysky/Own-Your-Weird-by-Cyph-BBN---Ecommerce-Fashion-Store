import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: { type: String },
  dAddress: { type: String },
  password: { type: String },
  orders: [
    {
      date: { type: String },
      order: [],
    },
  ],
});

const User = models.User || model("User", userSchema);

export default User;
