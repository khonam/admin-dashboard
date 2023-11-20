import React from "react";
import Layouts from "~/components/layouts/layouts";

export default function Artikel() {
  return (
    <Layouts>
      <div className="px-7 mt-3">
        <div className="flex justify-between items-center toko px-3">
          <div>
            <h1 className="font-semibold text-2xl">Artikel</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Category :</h1>
            <h1 className="text-lg font-medium">All Artikel</h1>
          </div>
        </div>
        <div className="w-full h-44 bg-white"></div>
      </div>
    </Layouts>
  );
}
