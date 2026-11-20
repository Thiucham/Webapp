import { useState } from "react";
import {
  useRouteLoaderData,
  useParams,
  useNavigate,
} from "react-router";

import { loader } from "~features/app/components/layouts/AppLayout";

import "./CollectionList.css";

import List from "~/features/app/components/ui/List.tsx";
import useSwipe from "~/features/app/hooks/useSwipe.ts";

const COLLECTIONS = [
  "Hiuna-Khomlui",
  "Khristen-Madui-Lui",
  "Luisan",
];

export default function CollectionList() {
const songs = useRouteLoaderData("app-layout");

  const { collection } = useParams();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    offsetX,
    isDragging,
  } = useSwipe({
    onSwipeLeft: nextCollection,
    onSwipeRight: previousCollection,
  });

  return (
    <div className="collection-scroll">
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
        <List
          songs={songs}
          collection={collection}
          onSelect={setSelectedIndex}
        />
      </main>
    </div>
  );
}
