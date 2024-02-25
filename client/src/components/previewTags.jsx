/* eslint-disable react/prop-types */
export default function PreviewTags({ tags }) {
  return (
    <div className="py-4">
      {tags.map((tag, index) => (
        <span
          key={tag.id}
          className={`inline-block text-white px-3 py-1 mr-2 mb-2 rounded-md ${
            index % 4 === 0
              ? "bg-red-500"
              : index % 4 === 1
              ? "bg-blue-500"
              : index % 4 === 2
              ? "bg-green-500"
              : "bg-yellow-500"
          }`}
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
}
