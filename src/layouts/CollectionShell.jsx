import { Outlet } from "react-router-dom";
import CollectionList from "../features/songs/pages/CollectionList";

export default function CollectionShell() {
  return (
    <>
      <CollectionList />
      <Outlet />
    </>
  );
}
