import { Outlet } from "react-router-dom";
import CollectionList from "../pages/CollectionList";

export default function CollectionShell() {
  return (
    <>
      <CollectionList />
      <Outlet />
    </>
  );
}
