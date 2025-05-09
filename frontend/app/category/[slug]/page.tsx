import React from "react";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories?filters[slug][$eq]=${params.slug}`, { cache: 'no-store' });
  const { data } = await res.json();
  if (!data || !data.length) return notFound();

  const category = data[0].attributes;

  // Fetch articles in this category
  const articlesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles?filters[category][slug][$eq]=${params.slug}&populate=author,cover_image`, { cache: 'no-store' });
  const { data: articles } = await articlesRes.json();

  return (
    <main className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{category.name}</h1>
      <div className="mb-8 text-gray-500">{category.description}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article: any) => (
          <div key={article.id} className="border rounded p-4">
            <h3 className="font-bold text-lg">{article.attributes.title}</h3>
            <div className="text-sm text-gray-500">By {article.attributes.author.data?.attributes?.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
} 