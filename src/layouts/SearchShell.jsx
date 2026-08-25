import { Outlet } from "react-router-dom";
import SearchList from "../features/songs/pages/SearchList";

export default function SearchShell() {
  return (
    <>
      <SearchList />
      <Outlet />
    </>
  );
}
