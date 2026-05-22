"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Download,
  FileText,
  Presentation,
} from "lucide-react";
import { RatingBadge } from "@/components/RatingBadge";
import { SectorBadge } from "@/components/SectorBadge";
import { Badge } from "@/components/ui/badge";
import { formatDate, calcUpside } from "@/lib/utils";
import type { Article, Pitch, StockReport } from "@/lib/types";

type ContentCardProps =
  | { type: "article"; data: Article; featured?: boolean }
  | { type: "report"; data: StockReport; featured?: boolean }
  | { type: "pitch"; data: Pitch; featured?: boolean };

const gradients: Record<string, string> = {
  Technology: "from-blue-600 to-blue-900",
  Healthcare: "from-emerald-600 to-emerald-900",
  Financials: "from-amber-600 to-amber-900",
  Energy: "from-orange-600 to-orange-900",
  Consumer: "from-purple-600 to-purple-900",
  Industrials: "from-slate-600 to-slate-900",
  Macro: "from-rose-600 to-rose-900",
};

export function ContentCard(props: ContentCardProps) {
  const { featured } = props;

  if (props.type === "article") {
    const { data } = props;
    return (
      <motion.article
        whileHover={{ y: -4 }}
        className={`group flex flex-col border border-border bg-surface shadow-card transition-shadow hover:shadow-card-hover ${
          featured ? "border-l-4 border-l-midnight" : ""
        }`}
      >
        <div
          className={`h-32 bg-gradient-to-br ${gradients[data.sector]} p-4`}
        >
          <SectorBadge sector={data.sector} />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <Badge variant="article" className="mb-2 w-fit">
            Article
          </Badge>
          <h3 className="font-serif text-lg leading-snug text-midnight group-hover:text-midnight">
            <Link href={`/research/articles/${data.slug}`}>{data.title}</Link>
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm text-text-muted">
            {data.excerpt}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
            <span>{data.author}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {data.readTime}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-text-muted">
            <span>{formatDate(data.date)}</span>
            <Link
              href={`/research/articles/${data.slug}`}
              className="flex items-center gap-1 font-medium text-midnight"
            >
              Read <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  if (props.type === "report") {
    const { data } = props;
    const upside = calcUpside(data.targetPrice, data.currentPrice);
    return (
      <motion.article
        whileHover={{ y: -4 }}
        className={`group flex flex-col border border-border bg-surface shadow-card transition-shadow hover:shadow-card-hover ${
          featured ? "border-l-4 border-l-midnight" : ""
        }`}
      >
        <div className="border-b border-border bg-surface p-5">
          <div className="flex items-start justify-between">
            <span className="font-mono text-lg font-bold text-midnight">
              {data.ticker}
            </span>
            <RatingBadge rating={data.rating} />
          </div>
          <p className="mt-1 text-sm text-text-muted">{data.company}</p>
          <div className="mt-3 flex gap-4 text-sm">
            <div>
              <span className="text-text-muted">Target</span>
              <p className="font-semibold text-midnight">
                {data.targetPrice.toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-text-muted">Upside</span>
              <p
                className={`font-semibold ${
                  Number(upside) >= 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {Number(upside) >= 0 ? "+" : ""}
                {upside}%
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <SectorBadge sector={data.sector} />
          <p className="mt-3 line-clamp-2 flex-1 text-sm text-text-muted">
            {data.summary}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
            <span>
              {data.analyst} · {formatDate(data.date)}
            </span>
            <Link
              href={`/research/stock-reports/${data.slug}`}
              className="flex items-center gap-1 text-midnight"
            >
              <Download className="h-3 w-3" /> Report
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  const { data } = props;
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className={`group flex flex-col border border-border bg-surface shadow-card transition-shadow hover:shadow-card-hover ${
        featured ? "border-l-4 border-l-midnight" : ""
      }`}
    >
      <div
        className={`flex h-36 items-center justify-center bg-gradient-to-br ${gradients[data.sector]}`}
      >
        <Presentation className="h-12 w-12 text-white/80" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <Badge variant="pitch">Pitch Deck</Badge>
          <span className="font-mono text-xs text-text-muted">
            {data.ticker}
          </span>
        </div>
        <h3 className="mt-2 font-serif text-lg text-midnight">
          {data.company}
        </h3>
        <SectorBadge sector={data.sector} />
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-text-muted">
          {data.thesis}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
          <span>
            {data.analyst} · {formatDate(data.date)}
          </span>
          <Link
            href={`/research/pitches/${data.slug}`}
            className="flex items-center gap-1 font-medium text-midnight"
          >
            <FileText className="h-3 w-3" /> View Pitch
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
