import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  json,
} from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import {
  createUserSession,
  login,
  noRequireSession,
} from "~/utils/session.server";
export const meta: MetaFunction = () => {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export const loader: LoaderFunction = async ({ request }) => {
  await noRequireSession(request);
  return null;
};

export const action: ActionFunction = async ({ request }: any) => {
  const formData = await request.formData();
  const { username, pass } = Object.fromEntries(formData);

  const user = await login(username, pass);

  if (!user)
    return json({
      fieldError: "email or password wrong",
    });

  return createUserSession(user.id);
};
export default function Index() {
  const actionData = useActionData();
  return (
    <div className="h-screen">
      <div className="h-screen flex justify-center items-center bg">
        <Form method="POST" className="space-y-2">
          <div className="text-center mb-5">
            <h1 className="text-3xl oswald font-bold">Teknolove.co</h1>
          </div>
          {(actionData as any)?.fieldError && (
            <p className="text-red-600 text-center">
              {(actionData as any).fieldError}
            </p>
          )}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="p-2 px-4 w-80 border-2 outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              name="pass"
              placeholder="Password"
              autoComplete="password"
              className="p-2 px-4 w-80 border-2 outline-none"
            />
          </div>
          <div>
            <button
              type="submit"
              className="p-2 w-80 bg-blue-800 hover:bg-blue-900 border-2 border-blue-800 hover:border-blue-900 text-white"
            >
              Login
            </button>
          </div>
          <p className="text-center">
            Belum punya akun?
            <Link to="/register"> Register</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
