import React from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";

export const AppLayout = () => {
  return (
    <div className="bg-linear-to-br from-slate-950 to-olive-800  bg-slate-950 min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
