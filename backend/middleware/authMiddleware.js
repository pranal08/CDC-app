import jwt from "jsonwebtoken";
import Patient from "../Models/patientModel.js";
import asyncHandler from "express-async-handler";

const protectPatient = asyncHandler(async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        req.patient = await Patient.findById(decoded.id).select("-password");
  
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
  
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
});
 export {protectPatient}