import { Outlet } from "react-router";
import Favourites from "./favourites.tsx";

export default function FavouritesShell() {
  return (
    <>
      <Favourites />
      <Outlet />
    </>
  );
}
