"use client";

import { useState } from "react";
import { slugifyTitle } from "@/lib/slug";

type SlugFieldProps = {
  defaultTitle?: string;
};

export default function SlugField({ defaultTitle = "" }: SlugFieldProps) {
  const [title, setTitle] = useState(defaultTitle);
  const slug = slugifyTitle(title);

  return (
    <>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all"
          placeholder="Enter post title..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Generated Slug
        </label>
        <input type="hidden" name="slug" value={slug} />
        <div className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono text-gray-600 bg-gray-50">
          {slug || "(auto-generated from title)"}
        </div>
        <p className="mt-1.5 text-xs text-gray-500">
          Slug is automatically generated from post title.
        </p>
      </div>
    </>
  );
}
