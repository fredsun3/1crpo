'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { poems, getAllPeriods, searchPoems } from '@/lib/poems-data';
import type { Poem } from '@/lib/types';
import { Search, BookOpen, Mountain, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-red-950 via-red-900 to-amber-900 text-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-amber-400 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-red-400 blur-3xl" />
      </div>

      {/* Mountain silhouette */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 200" className="w-full text-amber-950/30" fill="currentColor">
          <path d="M0,200 L0,120 Q120,60 240,100 Q360,40 480,80 Q600,20 720,70 Q840,30 960,90 Q1080,50 1200,75 Q1320,45 1440,85 L1440,200 Z" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:py-28">
        <div className="animate-ink-spread">
          <h1 className="font-serif text-4xl font-bold tracking-wider sm:text-5xl md:text-6xl">
            毛泽东诗词鉴赏
          </h1>
          <p className="mt-2 font-serif text-lg tracking-widest text-amber-200/80 sm:text-xl">
            诗 词 之 中 见 天 地
          </p>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-amber-100/70 sm:text-lg">
          收录毛泽东全部诗词作品，含原文、注释、图文解说与创作背景。
          <br />
          从&quot;恰同学少年，风华正茂&quot;到&quot;俱往矣，数风流人物，还看今朝&quot;，感受伟人诗词的磅礴气象与深邃思想。
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm text-amber-100 backdrop-blur-sm">
            <BookOpen className="h-4 w-4" />
            <span>收录 {poems.length} 首诗词</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm text-amber-100 backdrop-blur-sm">
            <Mountain className="h-4 w-4" />
            <span>跨越半个世纪</span>
          </div>
        </div>

        {/* Featured quote */}
        <div className="mt-12 rounded-2xl border border-amber-400/20 bg-white/5 px-8 py-6 backdrop-blur-sm">
          <p className="font-serif text-xl leading-relaxed text-amber-100 sm:text-2xl">
            俱往矣，数风流人物，还看今朝。
          </p>
          <p className="mt-2 text-sm text-amber-200/60">——《沁园春·雪》</p>
        </div>
      </div>
    </section>
  );
}

function PoemCard({ poem }: { poem: Poem }) {
  const firstContentLine = poem.content.find((l) => l.trim() !== '') || '';

  return (
    <Link href={`/poem/${poem.id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
        {/* Color banner or image */}
        {poem.imageUrl ? (
          <div className="relative h-32 overflow-hidden">
            <img
              src={poem.imageUrl}
              alt={poem.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-2 left-3">
              <span className="font-serif text-sm font-medium text-white/90">{poem.year}年</span>
            </div>
          </div>
        ) : (
          <div className={`h-2 bg-gradient-to-r ${poem.imageColor}`} />
        )}

        <div className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-serif text-lg font-semibold tracking-wide text-foreground group-hover:text-primary transition-colors">
                {poem.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{poem.year}年</p>
            </div>
            <ChevronRight className="mt-1 h-5 w-5 text-muted-foreground/40 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </div>

          <p className="mt-3 line-clamp-2 font-serif text-sm leading-relaxed text-muted-foreground/80">
            {firstContentLine}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {poem.themes.slice(0, 3).map((theme) => (
              <Badge
                key={theme}
                variant="secondary"
                className="text-xs font-normal"
              >
                {theme}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function PeriodSection({ period, periodPoems }: { period: string; periodPoems: Poem[] }) {
  return (
    <section className="scroll-mt-20">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
        <h2 className="font-serif text-2xl font-bold tracking-wider text-foreground">
          {period}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-primary/30 to-transparent" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {periodPoems.map((poem) => (
          <PoemCard key={poem.id} poem={poem} />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePeriod, setActivePeriod] = useState<string | null>(null);

  const periods = useMemo(() => getAllPeriods(), []);

  const filteredPoems = useMemo(() => {
    let result = poems;
    if (searchQuery.trim()) {
      result = searchPoems(searchQuery);
    }
    if (activePeriod) {
      result = result.filter((p) => p.period === activePeriod);
    }
    return result;
  }, [searchQuery, activePeriod]);

  const groupedPoems = useMemo(() => {
    if (searchQuery.trim()) {
      return [{ period: '搜索结果', periodPoems: filteredPoems }];
    }
    if (activePeriod) {
      return [{ period: activePeriod, periodPoems: filteredPoems }];
    }
    return periods.map((period) => ({
      period,
      periodPoems: filteredPoems.filter((p) => p.period === period),
    })).filter((g) => g.periodPoems.length > 0);
  }, [filteredPoems, periods, searchQuery, activePeriod]);

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Search & Filter Bar */}
      <div className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索诗词标题、内容或主题..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={activePeriod === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActivePeriod(null)}
              className="text-xs"
            >
              全部
            </Button>
            {periods.map((period) => (
              <Button
                key={period}
                variant={activePeriod === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActivePeriod(activePeriod === period ? null : period)}
                className="text-xs"
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Poems List */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        {filteredPoems.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">未找到匹配的诗词</p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery('');
                setActivePeriod(null);
              }}
              className="mt-2"
            >
              清除筛选条件
            </Button>
          </div>
        ) : (
          <div className="space-y-12">
            {groupedPoems.map((group) => (
              <PeriodSection
                key={group.period}
                period={group.period}
                periodPoems={group.periodPoems}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center">
          <p className="font-serif text-sm text-muted-foreground">
            诗词是人类精神的灯火，照亮历史的长河
          </p>
          <p className="mt-2 text-xs text-muted-foreground/60">
            毛泽东诗词鉴赏 — 收录毛泽东全部诗词作品
          </p>
        </div>
      </footer>
    </div>
  );
}
