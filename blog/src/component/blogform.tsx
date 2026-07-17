import { useForm } from "react-hook-form";
import type { BlogType } from "../type";
import { CreateBlog, UpdateBlog } from "../services/blogApi";
import { useEffect } from "react";

type BlogFormProp = {
  onRefresh: () => void;
  onClose: () => void;
  selectedBlog: BlogType | null;
};

export default function BlogFormProp({
  onRefresh,
  onClose,
  selectedBlog,
}: BlogFormProp) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BlogType>();
  // jjj

  useEffect(() => {
    if (selectedBlog) {
      reset({
        title: selectedBlog.title,
        content: selectedBlog.content,
      });
    }
  }, [selectedBlog, reset]);

  async function onSubmitForm(data: BlogType) {
    try {
      if (selectedBlog) {
        await UpdateBlog(selectedBlog.id, data);
      } else {
        await CreateBlog(data);
      }

      reset();

      onClose();

      onRefresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="bg-white w-full max-w-lg rounded-xl shadow-xl p-8 space-y-5"
      >
        <label className="block text-gray-700 font-medium mb-2">
          Blog Title
        </label>

        <h2 className="text-3xl font-bold text-center text-gray-800">
          {selectedBlog ? "Edit Blog" : "Create Blog"}
        </h2>

        <input
          type="text"
          placeholder="blog title"
          {...register("title", {
            required: "title is required",
          })}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}

        <label className="block text-gray-700 font-medium mb-2">
          Blog Content
        </label>

        <textarea
          placeholder="blog content"
          id="content"
          {...register("content", { required: "content is required" })}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          {isSubmitting
            ? "Saving..."
            : selectedBlog
              ? "Update Blog"
              : "Save Blog"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
