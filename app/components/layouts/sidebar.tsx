import { Form, Link, useLocation } from "@remix-run/react";
import React from "react";
import {
  MdOutlineDashboardCustomize,
  MdOutlineInsertPageBreak,
} from "react-icons/md/index.js";
import { HiOutlineNewspaper } from "react-icons/hi2/index.js";
import { IoSettingsOutline } from "react-icons/io5/index.js";
import { FiLogOut } from "react-icons/fi/index.js";

const MenuSidebar = [
  {
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: <MdOutlineDashboardCustomize />,
  },
  {
    name: "Artikel",
    to: "/admin/artikel",
    icon: <HiOutlineNewspaper />,
  },
  {
    name: "Post Artikel",
    to: "/admin/postartikel",
    icon: <MdOutlineInsertPageBreak />,
  },
  {
    name: "Setting",
    to: "/admin/setting",
    icon: <IoSettingsOutline />,
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-80 h-screen bg-white shadow-xl">
      <div className="flex flex-col h-screen justify-between py-5 px-4">
        <ul className="space-y-1">
          <div className="mb-10">
            <h1 className="text-center text-2xl font-semibold oswald">
              Teknolove.co
            </h1>
          </div>
          {MenuSidebar.map((i, index) => {
            return (
              <li key={index} className="toko tracking-wide">
                <Link
                  to={i.to}
                  className={`${
                    location.pathname === i.to
                      ? "bg-blue-800 flex items-center gap-2 p-3 px-10 text-md 2xl:text-lg text-white shadow-2xl"
                      : "hover:bg-blue-800 flex items-center gap-2 p-3 px-10 text-md 2xl:text-lg text-black hover:text-white"
                  }`}
                >
                  <div className="text-2xl">{i.icon}</div>
                  {i.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div>
          <Form method="POST" action="/logout">
            <button
              type="submit"
              className="flex items-center gap-1 text-lg toko"
            >
              <h1>LogOut</h1>
              <FiLogOut />
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
