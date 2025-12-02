// src/layouts/MainLayout.tsx
import type { ReactNode } from "react";
import { Header } from "../components/Header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-root">
      <Header />
      <main style={{ marginTop: 16 }}>{children}</main>
    </div>
  );
}
