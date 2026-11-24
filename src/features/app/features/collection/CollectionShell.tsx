import { Outlet,
       useParams,
       useNavigate, } from "react-router";

import AllList from "./AllList.tsx";
import Categories from "./Categories.tsx";
import Favourites from "./Favourites.tsx";

import useSwipe from "~/features/app/hooks/useSwipe.ts";
import "./CollectionShell.css";

export default function CollectionShell() {
  const navigate = useNavigate();
  const { view } = useParams();

  const Views = {
  alllist: AllList,
  categories: Categories,
  favourites: Favourites,
};

const viewOrder = Object.keys(Views);

const View = Views[view as keyof typeof Views];

const nextView = () => {
  const index = viewOrder.indexOf(view!);
  if (index < viewOrder.length - 1) {
    navigate(`../${viewOrder[index + 1]}`);
  }
};

const previousView = () => {
  const index = viewOrder.indexOf(view!);
  if (index > 0) {
    navigate(`../${viewOrder[index - 1]}`);
  }
};

  const {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    offsetX,
    isDragging,
  } = useSwipe({
    onSwipeLeft: nextView,
    onSwipeRight: previousView,
  });

  return (
    <div className="collection-scroll">
      <main
  className={`collection ${
    direction === "left"
      ? "collection-left"
      : "collection-right"
  }`}
  onTouchStart={onTouchStart}
  onTouchMove={onTouchMove}
  onTouchEnd={onTouchEnd}
  style={{
  transform: `translate3d(${offsetX}px, 0, 0)`,
  transition: isDragging ? "none" : "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
}}
>
  {View && <View />}
      </main>
      <Outlet />
    </div>
  );
}
