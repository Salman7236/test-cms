import { Router } from "express";
import proxy from "express-http-proxy";
import { config as dotenvConfig } from "dotenv";
import { authMiddleware } from "../middleware/authMiddleware.js";

dotenvConfig();

export const serviceRouter = Router();

const createProxy = (target) => {
  return proxy(target, {
    proxyReqPathResolver: (req) => {
      const path = req.originalUrl.slice(4);
      //logging
      console.log(
        `[Gateway] Proxying ${req.method} ${req.originalUrl} → ${target}${path}`
      );
      return path;
    },
  });
};

serviceRouter.use("/auth", createProxy(process.env.USER_SERVER));
// serviceRouter.use("/users", createProxy(process.env.USER_SERVER));
// serviceRouter.use("/user-types", createProxy(process.env.USER_SERVER));
serviceRouter.use("/companies", createProxy(process.env.COMPANY_SERVER));
serviceRouter.use("/offices", createProxy(process.env.OFFICE_SERVER));
serviceRouter.use("/office-alloc", createProxy(process.env.OFFICE_SERVER));
serviceRouter.use("/buildings", createProxy(process.env.OFFICE_SERVER));
serviceRouter.use(
  "/complaint-categories",
  createProxy(process.env.COMPLAINT_CATEGORY_SERVER)
);
serviceRouter.use("/complaints", createProxy(process.env.COMPLAINT_SERVER));

// logging
serviceRouter.use((err, req, res, next) => {
  console.error("[Gateway Error]", err.message || err);
  res.status(500).json({ error: "Gateway error" });
});

// // Protected routes
serviceRouter.use(
  "/users",
  authMiddleware,
  createProxy(process.env.USER_SERVER)
);
serviceRouter.use(
  "/user-types",
  authMiddleware,
  createProxy(process.env.USER_SERVER)
);
// serviceRouter.use(
//   "/companies",
//   authMiddleware,
//   createProxy(process.env.COMPANY_SERVER)
// );
// serviceRouter.use(
//   "/offices",
//   authMiddleware,
//   createProxy(process.env.OFFICE_SERVER)
// );
// serviceRouter.use(
//   "/office-alloc",
//   authMiddleware,
//   createProxy(process.env.OFFICE_SERVER)
// );
// serviceRouter.use(
//   "/buildings",
//   authMiddleware,
//   createProxy(process.env.OFFICE_SERVER)
// );
// serviceRouter.use(
//   "/complaint-categories",
//   authMiddleware,
//   createProxy(process.env.COMPLAINT_CATEGORY_SERVER)
// );
// serviceRouter.use(
//   "/complaints",
//   authMiddleware,
//   createProxy(process.env.COMPLAINT_SERVER)
// );
