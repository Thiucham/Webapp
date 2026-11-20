import { Outlet } from "react-router";
import Favourites from "../pages/favourites.tsx";

export default function FavouritesShell() {
  return (
    <>
      <Favourites />
      <Outlet />
    </>
  );
}
