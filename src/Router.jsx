import { createBrowserRouter, Outlet  } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import CollectionShell from "./features/songs/layouts/CollectionShell";
import CategoriesShell from "./features/songs/layouts/CategoriesShell";
import SearchShell from "./features/songs/layouts/SearchShell";
import FavouritesShell from "./features/songs/layouts/FavouritesShell";

import { FavouritesProvider } from "./features/songs/contexts/FavouritesProvider";

import Home from "./features/home/Home";
import SignIn from "./features/home/SignIn";

import CorrectionPage from "./features/corrections/pages/CorrectionPage";
import Details from "./features/songs/pages/Details";
import Projection from "./features/songs/pages/Projection";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
   {
      path: "/sign-in",
      element: <SignIn />,
    },
   {
  element: <AppLayout />,
  children: [

    {
      element: (
        <FavouritesProvider>
          <Outlet />
        </FavouritesProvider>
      ),
      children: [

        {
          path: ":collection/list",
          element: <CollectionShell />,
          children: [
            {
              path: ":songId",
              element: <Details />,
            },
            {
              path: "suggest-correction",
             element: <CorrectionPage />,
            },
            {
              path: "projection",
              element: <Projection />,
            },
          ],
        },

        {
          path: ":collection/categories",
          element: <CategoriesShell />,
          children: [
            {
              path: ":songId",
              element: <Details />,
            },
            {
              path: "suggest-correction",
             element: <CorrectionPage />,
            },
            {
              path: "projection",
              element: <Projection />,
            },
          ],
        },

        {
          path: ":collection/search",
          element: <SearchShell />,
          children: [
            {
              path: ":songId",
              element: <Details />,
            },
            {
              path: "suggest-correction",
             element: <CorrectionPage />,
            },
            {
              path: "projection",
              element: <Projection />,
            },
          ],
        },

        {
          path: "Favourites/list",
          element: <FavouritesShell />,
          children: [
            {
              path: ":songId",
              element: <Details />,
            },
            {
              path: "suggest-correction",
             element: <CorrectionPage />,
            },
            {
              path: "projection",
              element: <Projection />,
            },
          ],
        },

      ],
    },
  ],
},
  ],
  {
    basename: "/Webapp",
  }
);

export default router;
