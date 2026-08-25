import { Outlet } from "react-router-dom";
import Favourites from "../features/songs/pages/Favourites";

export default function FavouritesShell() {
  return (
    <>
      <Favourites />
      <Outlet />
    </>
  );
}
