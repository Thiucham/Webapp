import {
  Outlet,
  useRouteLoaderData,
  useLocation,
  useNavigate,
} from "react-router";

import type { clientLoader } from
  "~/features/app/components/layouts/AppLayout";

export default function LibraryShell() {
  const songs = useRouteLoaderData<
    typeof clientLoader
  >("app-layout");

  const location = useLocation();
  const navigate = useNavigate();

  // Determine active section from URL.

  // Handle horizontal swipe navigation.

  return (
    <div className="library-shell">
      <Outlet context={{ songs }} />
    </div>
  );
}