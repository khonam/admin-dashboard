import { LoaderFunction, json } from "@remix-run/node";
import React from "react";
import Layouts from "~/components/layouts/layouts";
import { prisma } from "~/utils/db.server";
import { requireSession } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireSession(request);
  return json(
    await prisma.artikel.findMany({
      where: {
        userId,
      },
    })
  );
};
export default function AdminDashboard() {
  return (
    <Layouts>
      <div>
        <h1>Khoirul Anam</h1>
      </div>
    </Layouts>
  );
}
