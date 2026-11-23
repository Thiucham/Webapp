import {
  useRouteLoaderData,
  useParams,
  useNavigate,
} from "react-router";

import type { clientLoader } from "~/features/app/components/layouts/AppLayout";

import "./List.css";

import List from "~/features/app/components/ui/List.tsx";

export default function List() {
const songs = useRouteLoaderData<typeof clientLoader>("app-layout");

  const { collection } = useParams();
  
  return (
    <div className="collection-scroll">
      <List
          songs={songs}
          collection={collection}
        />
    </div>
  );
}
