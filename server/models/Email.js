import { Schema, model } from "mongoose";

const EmailSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Email = model("Email", EmailSchema);

export default Email;
