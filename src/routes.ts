import {
  type RouteConfig,
  prefix,
} from "@react-router/dev/routes";

import siteRoutes from "./routes/site.routes.ts";
import appRoutes from "./routes/app.routes.ts";

export default [
  ...siteRoutes,
  ...prefix("app", appRoutes),
] satisfies RouteConfig;
