import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles?filters[slug][$eq]=${params.slug}&populate=author,category,cover_image`, { cache: 'no-store' });
  const { data } = await res.json();
  if (!data || !data.length) return notFound();

  const article = data[0].attributes;
  const imageUrl = article.cover_image?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${article.cover_image.data.attributes.url}`
    : "/placeholder.jpg";

  return (
    <article className="prose dark:prose-invert mx-auto">
      <h1>{article.title}</h1>
      <Image src={imageUrl} alt={article.title} width={800} height={500} />
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
      <div className="mt-4 text-sm text-gray-500">
        By {article.author.data.attributes.name} in {article.category.data.attributes.name}
      </div>
    </article>
  );
} 