import React from "react";
import LeftSidebar from "./left-sidebar";
import Breadcrumbs from "./breadcrumbs";
import { AuthProvider } from "@/providers/authProvider";

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <div className="flex w-screen bg-custom-dark">
        <LeftSidebar />
        <main className="flex flex-col flex-1 h-screen w-full xs:px-8 sm:px-12 md:px-16 py-11 overflow-y-scroll overflow-x-hidden scroll-custom bg-gradient-gray-linear rounded-tl-lg">
          <Breadcrumbs />
          <div>{children}</div>
        </main>
      </div>
    </AuthProvider>
  );
};

export default MainLayout;
