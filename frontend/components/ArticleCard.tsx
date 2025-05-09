import React from "react";
import Link from "next/link";
import Image from "next/image";

export function ArticleCard({ article }: { article: any }) {
  const { title, slug, cover_image, author, category, published_at } = article.attributes;
  const imageUrl = cover_image?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${cover_image.data.attributes.url}`
    : "/placeholder.jpg";

  return (
    <div className="rounded-lg shadow hover:shadow-lg transition bg-white dark:bg-gray-900">
      <Link href={`/article/${slug}`}>
        <Image src={imageUrl} alt={title} width={600} height={400} className="rounded-t-lg" />
        <div className="p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="text-sm text-gray-500 mt-2">
            By {author.data.attributes.name} in {category.data.attributes.name}
          </div>
          <div className="text-xs text-gray-400">{new Date(published_at).toLocaleDateString()}</div>
        </div>
      </Link>
    </div>
  );
} 