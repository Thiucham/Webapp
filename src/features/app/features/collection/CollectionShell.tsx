import { Outlet,
       useParams,
       useNavigate, } from "react-router";

import List from "./List.tsx";
import Categories from "./Categories.tsx";
import Favourites from "./Favourites.tsx";

import useSwipe from "~/features/app/hooks/useSwipe.ts";

export default function CollectionShell() {
   const location = useLocation();
  const navigate = useNavigate();
  const { view } = useParams();
  
  const Views = {
  List,
  Categories,
  Favourite,
};

type ViewName = keyof typeof Views;

const View = Views[view as ViewName];

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
    <>
      <main
        className="collection-content"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform: `translateX(${offsetX}px)`,
          transition: isDragging
            ? "none"
            : "transform 0.35s ease",
        }}
      >
        <{View && <View />
      </main>
      <Outlet />
    </>
  );
}
