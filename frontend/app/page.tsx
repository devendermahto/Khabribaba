import React from "react";
import { ArticleCard } from "../components/ArticleCard";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles?populate=author,category,cover_image&sort=published_at:desc&filters[status][$eq]=published`, { cache: 'no-store' });
  const { data: articles } = await res.json();

  return (
    <main>
      <h1 className="text-3xl font-bold">Latest News</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {articles?.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
} 