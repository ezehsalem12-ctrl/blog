import type { BlogType } from "../type";

const BASE_URL = "https://blog-ywxv.onrender.com/api/posts/";

// fetching data

export async function GetBlogs() {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function DeleteBlog(id: string) {
  try {
    const response = await fetch(`${BASE_URL}${id}`, {
      method: "Delete",
    });

    if (!response.ok) {
      throw new Error("failed to Delete Blog");
    }
  } catch (e) {
    console.error(e);
  }
}

export async function CreateBlog(blog: BlogType) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(blog),
    });

    if (!response.ok) {
      throw new Error("failed to create blog");
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function UpdateBlog(id: string, blog: BlogType) {
  try {
    const response = await fetch(`${BASE_URL}${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(blog),
    });

    if (!response.ok) {
      throw new Error("failed to update blog");
    }
  } catch (error) {
    console.error(error);
  }
}
