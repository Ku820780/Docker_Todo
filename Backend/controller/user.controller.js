import UserModel from "../model/user.model.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv"
dotenv.config()
const salt = 10

export const userRegister = (req, res) => {
    const {name, email, password } = req.body;
    bcrypt
      .hash(password, salt)
      .then((hash) => {
        UserModel.create({name, email, password: hash })
          .then((user) => {
            user.password = undefined
            res.status(200).json({
              message: "User Created Successfully",
              status: true,
              data: user,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Internal Server Error",
              status: false,
              data: null,
            });
          });
      })
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Internal Server Error", status: false, data: user })
      );
  };
  

 export const userLogin = (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            user.password = undefined;
            const token = jwt.sign(
              { email: user.email, name: user.name, id: user._id },
              "secret-key",
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.status(200).json({
              message: "Login Sucessfull",
              status: true,
              data: user,
            });
          } else {
            return res.status(400).json({
              message: "Password is incorrect",
              status: true,
              data: null,
            });
          }
        });
      } else {
        res.status(400).json({
          message: "Your account is not created",
          status: true,
          data: null,
        });
      }
    });
  };

 export const userLogout = (req, res) => {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ message: "Logout Successfully", status: true, data: null });
  };
  