const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const SwaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.routes");
const NotFoundHandler = require("./src/common/exception/not-found.handler");
const AllExceptionHandler = require("./src/common/exception/all-exception.handler");
const cookieParser = require("cookie-parser");
const expressEjsLayouts = require("express-ejs-layouts");
const moment = require("jalali-moment");
const methodOverride = require("method-override");

dotenv.config();

async function main() {
  const app = express();
  const port = process.env.PORT || 3400;

  require("./src/config/mongoose.config");

  // Body Parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Cookie Parser
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

  // CORS
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "https://vendo-frontend.vercel.app",
        "https://vendo-frontend-git-main-hamidreza-babazamani.vercel.app",
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    }),
  );

  // Static Files
  app.use(express.static("public"));

  // EJS Layouts
  app.use(expressEjsLayouts);
  app.use(methodOverride("_method"));

  // View Engine
  app.set("view engine", "ejs");
  app.set("layout", "./layouts/panel/main.ejs");
  app.set("layout extractScripts", true);
  app.set("layout extractStyles", true);

  // Swagger (قبل از routeها)
  SwaggerConfig(app);

  // Routes
  app.use(mainRouter);
  app.locals.moment = moment;

  // Error Handlers
  NotFoundHandler(app);
  AllExceptionHandler(app);

  // Server
  app.listen(port, () => {
    console.log(`🚀 Vendo Server: http://localhost:${port}`);
    console.log(`📚 Swagger: http://localhost:${port}/swagger`);
  });
}

main();
