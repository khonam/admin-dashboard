import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import Layouts from "~/components/layouts/layouts";
import {
  createArticle,
  createCategory,
  getCategories,
  getUserId,
} from "~/utils/session.server";

export const loader: LoaderFunction = async ({}) => {
  const categories = await getCategories();
  return json(categories);
};

export const action: ActionFunction = async ({ request }) => {
  try {
    // Extract form data
    const body = new URLSearchParams(await request.text());
    const title = body.get("title");
    const category = body.get("category");
    const content = body.get("content");

    // Create article or category based on the presence of title (article) or category (category)
    if (title) {
      // Assuming you have userId available; adjust accordingly
      const userId = "userId"; // Replace with the actual userId

      // Create article
      await createArticle({ title, content, userId, category });
    } else {
      // Create category
      await createCategory({ nama: category });
    }

    // Redirect after successful creation
    return redirect("/admin/artikel");
  } catch (error) {
    console.error("Error creating article or category:", error);

    // Handle the error appropriately
    return redirect("/admin/artikel", {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
export default function PostArtikel() {
  const { categories }: any = useLoaderData();

  return (
    <Layouts>
      <div className="mt-3 px-7">
        <div>
          <h1 className="toko text-2xl font-medium">Tambah Artikel</h1>
        </div>
        <div className="mt-3">
          <Form method="POST" className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="w-full">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="p-3 px-5 w-full outline-blue-800"
                />
              </div>
              <div className="w-full">
                <select
                  name="category"
                  className="p-3 px-5 w-full outline-blue-800"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((category: any) => (
                    <option key={category.id}>{category.nama}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="">
              <textarea
                placeholder=""
                name="content"
                className="w-full h-96 outline-none p-4"
              />
            </div>
            <div className="">
              <button
                type="submit"
                className="bg-blue-800 p-3 px-10 text-white"
              >
                Save
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Layouts>
  );
}
