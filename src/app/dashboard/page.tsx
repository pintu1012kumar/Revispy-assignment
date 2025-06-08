"use client";

import React, { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
};

export default function Dashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const totalPages = 6; // fixed number, since setTotalPages was unused
  const [loading, setLoading] = useState(false);

  const fetchCategories = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/categories?page=${pageNum}`);
      const data = await res.json();
      setCategories(data.categories);
      setPage(data.currentPage);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories(page);
  }, [page]);

  const toggleSelection = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-5xl mx-auto pt-28 pb-20 px-4">
      <h1 className="text-4xl font-bold mb-12 text-center">
        Please hover and mark your interest !!
      </h1>
      <p className="text-2xl mb-12 text-center">
        &quot; We&apos;ll <span className="text-red-500">keep</span> you notified. &quot;
      </p>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((cat) => {
            const isSelected = selected.includes(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => toggleSelection(cat.id)}
                className={`p-6 border rounded-lg shadow-sm cursor-pointer transition relative
                  ${isSelected
                    ? "bg-green-100 border-green-500 text-green-800 font-semibold"
                    : "bg-black border-gray-300 hover:bg-blue-400"
                  }`}
              >
                {cat.name}
                {isSelected && (
                  <span className="absolute top-2 right-3 text-green-600 text-lg">✓</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-center items-center mt-10 space-x-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          ◀ Prev
        </button>

        <span className="text-lg font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
