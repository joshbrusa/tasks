import { createTransport } from "nodemailer";

export const transport = createTransport({
  service: "outlook",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});
