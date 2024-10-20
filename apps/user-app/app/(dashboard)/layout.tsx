"use client";

import React from "react";
import Sidebar from "../components/Sidebar";
import { Appbar } from "@repo/ui/appbar";
import { useSession } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const session = useSession();

  return (
    <div className="h-screen flex flex-col">
      <Appbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
