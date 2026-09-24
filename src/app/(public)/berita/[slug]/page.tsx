import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  MessageCircle,
  Tag,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { schoolInfo } from "@/data/dummy";
import { getNewsDetail, getNews } from "@/server/actions/news";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsDetail(slug);
  if (!news) return { title: "Berita Tidak Ditemukan" };

  return {
    title: news.title,
    description: news.excerpt,
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const news = await getNewsDetail(slug);

  if (!news) {
    notFound();
  }

  const allNews = await getNews(1, 10);
  const relatedNews = allNews.filter((n) => n.id !== news.id).slice(0, 2);

  // Generate share WhatsApp URL
  const shareText = `Baca berita terbaru dari ${schoolInfo.name}: "${news.title}"`;
  const shareWhatsAppUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 space-y-8">
      {/* Breadcrumb & Back Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/berita"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Daftar Berita
        </Link>
        <Badge variant="secondary" className="font-bold">
          {news.category}
        </Badge>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-foreground leading-tight">
          {news.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground border-b border-border/80 pb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary" />
            {formatDate(news.publishedAt || news.createdAt)}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-primary" />
            Penulis: <strong>{news.author?.fullName || "Admin"}</strong>
          </span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative aspect-video rounded-3xl overflow-hidden border border-border shadow-lg bg-muted flex items-center justify-center">
        {news.thumbnailUrl ? (
          <img
            src={news.thumbnailUrl}
            alt={news.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-muted-foreground">Tidak ada gambar</span>
        )}
      </div>

      {/* Article Content */}
      <article className="prose prose-emerald max-w-none text-muted-foreground leading-relaxed space-y-4 text-base">
        {news.content.split("\n\n").map((para, i) => (
          <p key={i} className="leading-relaxed">
            {para.trim()}
          </p>
        ))}
      </article>

      {/* Tags & Share Section */}
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 border-y border-border py-6">
        <div>
          <a
            href={shareWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="sm" className="font-bold gap-2">
              <MessageCircle className="h-4 w-4" />
              Bagikan ke WhatsApp
            </Button>
          </a>
        </div>
      </div>

      {/* Related News */}
      <div className="pt-8 space-y-6">
        <h3 className="font-heading text-xl font-bold text-foreground">
          Berita Terkait Lainnya
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {relatedNews.map((item) => (
            <Card key={item.id} hoverable className="overflow-hidden">
                <div className="relative aspect-video bg-muted flex items-center justify-center">
                  {item.thumbnailUrl ? (
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-muted-foreground text-xs">No image</span>
                  )}
                </div>
                <CardContent className="p-4 space-y-2">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(item.publishedAt || item.createdAt)}
                  </span>
                  <h4 className="font-heading font-bold text-sm line-clamp-2">
                  {item.title}
                </h4>
                <Link
                  href={`/berita/${item.slug}`}
                  className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 pt-1"
                >
                  Baca Selengkapnya
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
