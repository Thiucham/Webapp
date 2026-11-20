import {
  type RouteConfig,
  prefix,
} from "@react-router/dev/routes";

import websiteRoutes from "./routes/website.routes.ts";
import appRoutes from "./routes/app.routes.ts";

export default [
  ...websiteRoutes,
  ...prefix("app", appRoutes),
] satisfies RouteConfig;
