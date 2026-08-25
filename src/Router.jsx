import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./layouts/AppLayout.jsx";
import CollectionShell from "./layouts/CollectionShell.jsx";
import CategoriesShell from "./layouts/CategoriesShell.jsx";
import SearchShell from "./layouts/SearchShell.jsx";
import FavouritesShell from "./layouts/FavouritesShell.jsx";

import { FavouritesProvider } from "./contexts/FavouritesProvider.jsx";

import Home from "./features/home/Home.jsx";
import Details from "./features/songs/pages/Details.jsx";
import Projection from "./features/songs/pages/Projection.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },

    {
      element: (
        <FavouritesProvider>
          <AppLayout />
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
             path: "projection",
             element: <Projection />,
            },
          ],
        },
        {
          path: "Favourites",
          element: <FavouritesShell />,
          children: [
            {
              path: ":songId",
              element: <Details />,
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
  {
    basename: "/Webapp",
  }
);

export default router;
