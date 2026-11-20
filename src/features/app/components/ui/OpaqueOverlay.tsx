import type { ReactNode } from "react";

import "./OpaqueOverlay.css";

type OpaqueOverlayProps = {
  children?: ReactNode;
};

export default function OpaqueOverlay({
  children,
}: OpaqueOverlayProps) {
  return (
    <div className="opaque-overlay">
      {children}
    </div>
  );
}
