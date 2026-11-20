import { Outlet } from "react-router";
import CollectionList from "./collectionList.tsx";

export default function CollectionShell() {
  return (
    <>
      <CollectionList />
      <Outlet />
    </>
  );
}
