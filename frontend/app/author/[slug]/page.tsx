import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors?filters[slug][$eq]=${params.slug}&populate=avatar`, { cache: 'no-store' });
  const { data } = await res.json();
  if (!data || !data.length) return notFound();

  const author = data[0].attributes;
  const imageUrl = author.avatar?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${author.avatar.data.attributes.url}`
    : "/placeholder.jpg";

  // Fetch articles by this author
  const articlesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles?filters[author][slug][$eq]=${params.slug}&populate=cover_image,category`, { cache: 'no-store' });
  const { data: articles } = await articlesRes.json();

  return (
    <main className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Image src={imageUrl} alt={author.name} width={100} height={100} className="rounded-full" />
        <div>
          <h1 className="text-2xl font-bold">{author.name}</h1>
          <div className="text-gray-500">{author.bio}</div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Articles by {author.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article: any) => (
          <div key={article.id} className="border rounded p-4">
            <h3 className="font-bold text-lg">{article.attributes.title}</h3>
            <div className="text-sm text-gray-500">{article.attributes.category.data?.attributes?.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
} 