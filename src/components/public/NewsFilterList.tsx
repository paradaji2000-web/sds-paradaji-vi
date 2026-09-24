"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { type News } from "@/db/schema";

export function NewsFilterList({ initialNews }: { initialNews: News[] }) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("Semua");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const categories = ["Semua", "berita", "kegiatan", "pengumuman"];

  const filteredNews = initialNews.filter((item) => {
    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-4 rounded-2xl border border-border">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all capitalize ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari berita atau kegiatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 rounded-full"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs text-muted-foreground px-1">
        Menampilkan <strong>{filteredNews.length}</strong> artikel
        {selectedCategory !== "Semua" && ` dalam kategori "${selectedCategory}"`}
      </div>

      {/* News Grid */}
      {filteredNews.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-2xl border border-dashed border-border p-8">
          <p className="text-muted-foreground text-sm">
            Tidak ditemukan berita yang cocok dengan pencarian Anda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <Card
              key={news.id}
              hoverable
              className="flex flex-col overflow-hidden group border-border/80"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={news.thumbnailUrl || "/images/placeholder.jpg"}
                  alt={news.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="font-bold shadow-xs capitalize">
                    {news.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(news.publishedAt || news.createdAt)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Admin
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {news.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {/* Tags removed as they are not in schema */}
                  </div>

                  <Link
                    href={`/berita/${news.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    Selengkapnya
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
