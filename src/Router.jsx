import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./layouts/AppLayout.jsx";

import CategoriesList from "./features/songs/pages/CategoriesList.jsx";
import Favourites from "./features/songs/pages/Favourites.jsx";
import SearchList from "./features/songs/pages/SearchList.jsx";
import Home from "./features/home/Home.jsx";
import CollectionList from "./features/songs/pages/CollectionList.jsx";
import Details from "./features/songs/pages/Details.jsx";
import Projection from "./features/songs/pages/Projection.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "projection",
    element: <Projection />,
  },

  {
    element: <AppLayout />,
    children: [
      {
        path: ":collection",
        children: [
          {
            index: true,
            element: <CollectionList />,
          },

          {
            path: "categories",
            element: <CategoriesList />,
          },

          {
            path: "search",
            element: <SearchList />,
          },

          {
            path: ":songId",
            element: <Details />,
          },

          {
            path: "search/:songId",
            element: <Details />,
          },

          {
            path: "categories/:songId",
            element: <Details />,
          },
        ],
      },

      {
        path: "Favourites",
        element: <Favourites />,
      },
    ],
  },
],

  {
    basename: "/Webapp",
  });

export default router;
