import { Outlet } from "react-router";
import SearchList from "./SearchList.tsx";

export default function SearchShell() {
  return (
    <>
      <SearchList />
      <Outlet />
    </>
  );
}
