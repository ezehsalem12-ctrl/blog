import { useState } from "react";
import BlogForm from "../component/blogform";
import BlogLists from "../component/bloglist";
import type { BlogType } from "../type";

export default function Home() {
  const [openForm, setOpenForm] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState<BlogType | null>(null);

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  const handleSelect = (blog: BlogType) => {
    setSelectedBlog(blog);
    setOpenForm(true);
  };

  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800"> Blog App</h1>

          <button
            onClick={() => {
              setSelectedBlog(null);
              setOpenForm(true);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + New Blog
          </button>
        </div>

        <div className="space-y-6">
          <BlogLists refresh={refresh} onSelect={handleSelect} />

          {openForm && (
            <BlogForm
              onRefresh={handleRefresh}
              onClose={closeForm}
              selectedBlog={selectedBlog}
            />
          )}
        </div>
      </div>
    </section>
  );
}
