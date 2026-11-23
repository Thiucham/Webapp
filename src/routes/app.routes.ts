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
            route(":songId", DETAILS_PAGE, { id: "collection-details" }),
            route("suggest-correction", CORRECTION_PAGE, {
              id: "collection-correction",
            }),
            route("projection", PROJECTION_PAGE, {
              id: "collection-projection",
            }),
          ]
        ),

        route(
          ":collection/search",
          "features/app/features/search/SearchShell.tsx",
          [
            route(":songId", DETAILS_PAGE, { id: "search-details" }),
            route("suggest-correction", CORRECTION_PAGE, {
              id: "search-correction",
            }),
            route("projection", PROJECTION_PAGE, {
              id: "search-projection",
            }),
          ]
        ),

        route(
          "Favourites/list",
          "features/app/features/favourite/AllFavouritesShell.tsx",
          [
            route(":songId", DETAILS_PAGE, {
              id: "all-fav-details",
            }),
            route("suggest-correction", CORRECTION_PAGE, {
              id: "all-fav-correction",
            }),
            route("projection", PROJECTION_PAGE, {
              id: "all-fav-projection",
            }),
          ]
        ),
      ]),
    ],
    { id: "app-layout" }
  ),
] satisfies RouteConfig;
