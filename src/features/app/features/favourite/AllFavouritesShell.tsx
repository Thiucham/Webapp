import { Outlet } from "react-router";
import Favourites from "./AllFavourites.tsx";

export default function AllFavouritesShell() {
  return (
    <>
      <Favourites />
      <Outlet />
    </>
  );
}
