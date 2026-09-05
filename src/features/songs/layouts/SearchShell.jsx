import { Outlet } from "react-router-dom";
import SearchList from "../pages/SearchList";

export default function SearchShell() {
  return (
    <>
      <SearchList />
      <Outlet />
    </>
  );
}
