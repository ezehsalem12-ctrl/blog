import type { BlogType } from "../type";

type blogItemType = {
  blog: BlogType;
  onDelete: (id: string) => void;
  onSelect: (blog: BlogType) => void;
};

export default function BlogItems({ blog, onDelete, onSelect }: blogItemType) {
  return (
    <li className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">{blog.title}</h2>
      <p className="text-gray-600 leading-7 mb-6">{blog.content}</p>

      <div className="flex gap-3">
        <button
          onClick={() => onSelect(blog)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(blog.id)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
