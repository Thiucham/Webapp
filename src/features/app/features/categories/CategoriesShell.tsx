import { Outlet } from "react-router";
import CategoriesList from "../pages/categoriesList.tsx";

export default function CategoriesShell() {
  return (
    <>
      <CategoriesList />
      <Outlet />
    </>
  );
}
