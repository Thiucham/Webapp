import { useState } from "react";
import {
  Outlet,
  useParams,
  useNavigate,
  useOutletContext,
} from "react-router";
import type { AppLoaderData } from "~/features/app/components/layouts/AppLayout";

import AllList from "./AllList.tsx";
import Categories from "./Categories.tsx";
import Favourites from "./Favourites.tsx";
import Search from "./Search.tsx";

import useSwipe from "~/features/app/hooks/useSwipe.ts";
import "./CollectionShell.css";

export default function CollectionShell() {
  const navigate = useNavigate();
  const { collection = "", view } = useParams();
  const appData = useOutletContext<AppLoaderData | undefined>();
  const [direction, setDirection] = useState("");

  const songsByCollection = appData?.songs ?? {};
  const songs = collection ? songsByCollection[collection] ?? [] : [];

  const Views = {
    AllList: AllList,
    Categories: Categories,
    Favourites: Favourites,
    Search: Search,
  };

  const viewOrder = Object.keys(Views);

  const View = Views[view as keyof typeof Views];

  const nextView = () => {
    const index = viewOrder.indexOf(view!);
    if (index < viewOrder.length - 1) {
      setDirection("right");
      navigate(`../${viewOrder[index + 1]}`);
    }
  };

  const previousView = () => {
    const index = viewOrder.indexOf(view!);
    if (index > 0) {
      setDirection("left");
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
        className={`collection${direction}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform: `translate3d(${offsetX}px, 0, 0)`,
          transition: isDragging
            ? "none"
            : "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
{View && <View songs={songs} collection={collection} />}
      </main>
      <Outlet />
    </div>
  );
}
