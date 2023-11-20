import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";

export default function Layouts({ children }: any) {
  return (
    <div className="flex bg-gray-200">
      <Sidebar />
      <div className="w-full">
        <Header />
        {children}
      </div>
    </div>
  );
}
