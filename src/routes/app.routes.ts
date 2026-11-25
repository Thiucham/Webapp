import { type RouteConfig, layout, route, index } from "@react-router/dev/routes";

const DETAILS_PAGE = "features/app/features/details/Details.tsx";
const CORRECTION_PAGE = "features/app/features/correction/CorrectionPage.tsx";
const PROJECTION_PAGE = "features/app/features/projection/Projection.tsx";

export default [
  index("features/app/features/home/Home.tsx"),
  route("sign-in", "features/app/features/auth/SignIn.tsx"),

  layout(
    "features/app/components/layouts/AppLayout.tsx",
    [
      layout("features/app/contexts/FavouritesProvider.tsx", [
        route(
          ":collection/:view",
          "features/app/features/collection/CollectionShell.tsx",
          [
            route(":songId", DETAILS_PAGE),
            route("suggest-correction", CORRECTION_PAGE),
            route("projection", PROJECTION_PAGE),
          ]
        ),
      ]),
    ],
    { id: "app-layout" }
  ),
] satisfies RouteConfig;
