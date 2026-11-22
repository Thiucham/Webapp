
import { type RouteConfig, layout, route, index } from "@react-router/dev/routes";

import { CollectionLoader } from "~/features/app/loaders/CollectionLoader";

// Reusable page paths
const DETAILS_PAGE = "~/features/app/features/details/Details.tsx";
const CORRECTION_PAGE = "~/features/app/features/corrections/CorrectionPage.tsx";
const PROJECTION_PAGE = "~/features/app/features/projection/Projection.tsx";

export default [
  // Home and Authentication (No loaders)
  index("features/app/features/home/Home.tsx"),
  route("sign-in", "~/features/app/features/auth/SignIn.tsx"),

  layout("~/features/app/components/layouts/AppLayout.tsx", [
    layout("~/features/app/contexts/FavouritesProvider.tsx", [

      // 1. Collection List Routes
      route(
        ":collection/list",
        "~/features/app/features/collection/CollectionShell.tsx",
        [
          route(":songId", DETAILS_PAGE, { id: "list-details" }),
          route("suggest-correction", CORRECTION_PAGE, {
            id: "list-correction",
          }),
          route("projection", PROJECTION_PAGE, {
            id: "list-projection",
          }),
        ]
      ),

      // 2. Categories Routes
      route(
        ":collection/categories",
        "~/features/app/features/categories/CategoriesShell.tsx",
        [
          route(":songId", DETAILS_PAGE, { id: "cat-details" }),
          route("suggest-correction", CORRECTION_PAGE, {
            id: "cat-correction",
          }),
          route("projection", PROJECTION_PAGE, {
            id: "cat-projection",
          }),
        ]
      ),

      // 3. Search Routes
      route(
        ":collection/search",
        "~/features/app/features/search/SearchShell.tsx",
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

      // 4. Collection-specific Favourites Routes
      route(
        ":collection/favourite",
        "~/features/app/features/favourite/FavouritesShell.tsx",
        [
          route(":songId", DETAILS_PAGE, {
            id: "collection-fav-details",
          }),
          route("suggest-correction", CORRECTION_PAGE, {
            id: "collection-fav-correction",
          }),
          route("projection", PROJECTION_PAGE, {
            id: "collection-fav-projection",
          }),
        ]
      ),

      // 5. All Collections Favourites Routes
      route(
        "Favourites/list",
        "~/features/app/features/favourite/AllFavouritesShell.tsx",
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
  {
    id: "app-layout",
    loader: CollectionLoader,
  }),
] satisfies RouteConfig;
