import { Outlet } from "react-router";
import SearchList from "../pages/SearchList.tsx";

export default function SearchShell() {
  return (
    <>
      <SearchList />
      <Outlet />
    </>
  );
}
