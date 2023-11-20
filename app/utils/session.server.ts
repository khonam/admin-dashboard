import { createCookieSessionStorage, redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";
import { prisma } from "./db.server";

export async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
}

export async function register({ username, email, pass }: any) {
  const hash = await bcrypt.hash(pass, 10);

  return await prisma.user.create({
    data: {
      username,
      email,
      pass: hash,
    },
  });
}

export async function login(username: any, pass: any) {
  const user = await getUserByUsername(username);

  if (!user) return null;

  const isCorrectPassword = await bcrypt.compare(pass, user.pass);

  if (!isCorrectPassword) return null;

  return user;
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) throw new Error("SESSION_SECRET must be set");

const oneDay = 60 * 60 * 60 * 24;
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "_session",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      secrets: [sessionSecret],
      maxAge: oneDay,
      path: "/admin/dashboard",
      sameSite: "lax",
    },
  });

export async function createUserSession(userId: any) {
  const session = await getSession();
  session.set("userId", userId);
  return redirect("/admin/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

function getUserSession(request: any) {
  const cookie = request.headers.get("Cookie");
  return getSession(cookie);
}

export async function getUserId(request: any) {
  const userSession = await getUserSession(request);
  if (!userSession.has("userId")) return null;

  const userId = userSession.get("userId");
  return userId;
}

export async function requireSession(request: any) {
  const userId = await getUserId(request);
  if (!userId) throw redirect("/");

  return userId;
}

export async function noRequireSession(request: any) {
  const userId = await getUserId(request);
  if (userId) throw redirect("/admin/dashboard");
}

export async function logout(request: any) {
  const session = await getUserSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
export async function createCategory({ nama, userId }: any) {
  return await prisma.category.create({
    data: {
      nama,
      userId,
    },
  });
}

export async function getCategories() {
  try {
    // Fetch all categories from the database
    const categories = await prisma.category.findMany();

    return categories;
  } catch (error) {
    console.error(error);
    throw error; // Propagate the error or handle it as needed
  }
}

export async function createArticle({
  title,
  content,
  userId,
  categoryId,
}: any) {
  return await prisma.artikel.create({
    data: {
      title,
      content,
      userId,
      categoryId,
    },
  });
}

export async function getArticlesByCategory(categoryId: string) {
  try {
    // Fetch articles from the database based on the categoryId
    const articles = await prisma.artikel.findMany({
      where: {
        category: {
          id: categoryId,
        },
      },
    });

    return articles;
  } catch (error) {
    console.error("Error fetching articles by category:", error);
    throw error;
  }
}
