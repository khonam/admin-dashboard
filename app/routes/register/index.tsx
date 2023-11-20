import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import {
  getUserByUsername,
  noRequireSession,
  register,
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
  const { username, email, pass } = Object.fromEntries(formData);

  const userExist = await getUserByUsername(username);

  if (userExist)
    return json({
      fieldError: "email already exist",
    });

  await register({ username, email, pass });
  return redirect("/");
};

export default function Register() {
  const actionData = useActionData();
  return (
    <div className="h-screen">
      <div className="h-screen flex justify-center items-center bg">
        <Form method="POST" className="space-y-2">
          <div className="text-center font-medium mb-5">
            <h1 className="text-3xl oswald font-bold">FORM REGISTER</h1>
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
              type="email"
              name="email"
              placeholder="Email"
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
              Register
            </button>
          </div>
          <p className="text-center">
            Sudah punya akun?
            <Link to="/"> Login</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
