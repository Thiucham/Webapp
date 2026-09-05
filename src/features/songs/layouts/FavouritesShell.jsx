import { Outlet } from "react-router-dom";
import Favourites from "../pages/Favourites";

export default function FavouritesShell() {
  return (
    <>
      <Favourites />
      <Outlet />
    </>
  );
}
