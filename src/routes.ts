import {
  type RouteConfig,
  prefix,
} from "@react-router/dev/routes";

import siteRoutes from "./routes/site.routes";
import appRoutes from "./routes/app.routes";

export default [
  ...siteRoutes,
  ...prefix("app", appRoutes),
] satisfies RouteConfig;
