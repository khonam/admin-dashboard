import { Form } from "@remix-run/react";
import React from "react";

export default function Header() {
  return (
    <div className="py-3 px-7 relative w-full">
      <div>
        <Form>
          <div>
            <input
              type="search"
              placeholder="Remix.run"
              className="p-3 w-full shadow-lg"
            />
          </div>
        </Form>
      </div>
    </div>
  );
}
