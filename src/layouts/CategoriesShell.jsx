import { Outlet } from "react-router-dom";
import CategoriesList from "../features/songs/pages/CategoriesList";

export default function CategoriesShell() {
  return (
    <>
      <CategoriesList />
      <Outlet />
    </>
  );
}
