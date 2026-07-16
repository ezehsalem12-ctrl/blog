import { useEffect, useState } from "react";
import { DeleteBlog, GetBlogs } from "../services/blogApi";
import BlogItems from "./blogitems";
import type { BlogType } from "../type";

type BlogListProps = {
  refresh: number;
  onSelect: (blog: BlogType) => void;
};

export default function BlogLists({ refresh, onSelect }: BlogListProps) {
  const [blogs, setBlogs] = useState<BlogType[]>();

  useEffect(() => {
    async function FetchBlog() {
      const blogsData = await GetBlogs();
      setBlogs(blogsData);

      console.log(blogsData);
    }

    FetchBlog();
  }, [refresh]);

  async function handleDelete(id: string) {
    await DeleteBlog(id);

    setBlogs((prev) => prev?.filter((blog) => blog.id !== id));
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Blog Lists</h2>
      <ul className="space-y-5">
        {blogs?.map((blog) => (
          <BlogItems
            key={blog.id}
            blog={blog}
            onDelete={handleDelete}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
}
