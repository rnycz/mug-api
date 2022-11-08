import express, { Request, Response, NextFunction } from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import productRoutes from "./routes/product.routes";

const router = express();

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected to database!");
    startServer();
  })
  .catch((error: Error) => {
    console.log("Error: ", error);
  });

const startServer = () => {
  router.use((request: Request, response: Response, next: NextFunction) => {
    console.log(`Method: ${request.method}, URL: ${request.url}`);

    response.on("finish", () => {
      console.log(`Status: ${response.statusCode}`);
    });

    next();
  });
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use((request: Request, response: Response, next: NextFunction) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (request.method == "OPTIONS") {
      response.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE"
      );
      return response.status(200).json({});
    }
    next();
  });

  router.use("/product", productRoutes);

  router.get("/", (request: Request, response: Response) =>
    response.status(200).json({ message: "Welcome to MUG API" })
  );

  router.use((request: Request, response: Response) => {
    const error: Error = new Error("Not Found");
    console.log(error);

    return response.status(404).json({ message: error.message });
  });

  http.createServer(router).listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`);
  });
};
