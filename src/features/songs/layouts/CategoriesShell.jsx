import { Outlet } from "react-router-dom";
import CategoriesList from "../pages/CategoriesList";

export default function CategoriesShell() {
  return (
    <>
      <CategoriesList />
      <Outlet />
    </>
  );
}
