import { Box, Modal, Typography } from "@mui/material";

import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { json } from "react-router";

import Layouts from "~/components/layouts/layouts";
import { createCategory, getCategories } from "~/utils/session.server";

export const loader: LoaderFunction = async ({}) => {
  const categories = await getCategories();
  return json({ categories });
};
export const action: ActionFunction = async ({ request }) => {
  try {
    const body = new URLSearchParams(await request.text());
    const nama = body.get("nama");
    if (!nama) {
      return json({ error: "Nama is required" }, { status: 400 });
    }
    await createCategory({ nama });
    return null;
  } catch (error) {
    console.error("Error creating category:", error);
    return json({ error: "Failed to create category" }, { status: 500 });
  }
};

export default function Setting() {
  const { categories }: any = useLoaderData();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  return (
    <Layouts>
      <div className="px-7 relative">
        <div className="space-y-2">
          <button
            onClick={handleOpen}
            className="bg-blue-800 p-2 px-5 text-white hover:bg-blue-700"
          >
            Add
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-9 space-y-1">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Tambah category
              </Typography>
              <Form
                method="POST"
                onSubmit={() => {
                  handleClose();
                  navigate("/admin/setting");
                }}
                className="space-y-2"
              >
                <div>
                  <input
                    type="text"
                    name="nama"
                    placeholder="Category"
                    className="p-2 px-5 w-80 border-2 outline-none focus:border-blue-600"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-800 p-2 px-7 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </Form>
            </Box>
          </Modal>

          <table className="table-auto shadow-xl bg-white w-full">
            <thead className="">
              <tr>
                <th className="px-4 py-2">Category</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category: any) => (
                <tr key={category.id}>
                  <td className="border px-4 py-2">{category.nama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layouts>
  );
}
