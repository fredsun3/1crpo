'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Poem } from '@/lib/types';
import { poems } from '@/lib/poems-data';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Lightbulb,
  ScrollText,
  Tag,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

function NavButtons({ currentId }: { currentId: string }) {
  const currentIndex = poems.findIndex((p) => p.id === currentId);
  const prevPoem = currentIndex > 0 ? poems[currentIndex - 1] : null;
  const nextPoem = currentIndex < poems.length - 1 ? poems[currentIndex + 1] : null;

  return (
    <div className="flex items-center justify-between gap-4">
      {prevPoem ? (
        <Link href={`/poem/${prevPoem.id}`} className="flex-1">
          <Button variant="outline" className="w-full justify-start gap-2 text-sm">
            <ChevronLeft className="h-4 w-4" />
            <span className="truncate">{prevPoem.title}</span>
          </Button>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {nextPoem ? (
        <Link href={`/poem/${nextPoem.id}`} className="flex-1">
          <Button variant="outline" className="w-full justify-end gap-2 text-sm">
            <span className="truncate">{nextPoem.title}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}

export default function PoemDetailClient({ poem }: { poem: Poem }) {
  const [activeSection, setActiveSection] = useState<'original' | 'commentary' | 'background'>('original');

  return (
    <div className="min-h-screen">
      {/* Hero with gradient */}
      <section className={`relative overflow-hidden ${poem.imageUrl ? 'bg-black' : `bg-gradient-to-br ${poem.imageColor}`} text-white`}>
        {poem.imageUrl ? (
          <>
            <img
              src={poem.imageUrl}
              alt={poem.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
          </>
        ) : (
          <div className="absolute inset-0 bg-black/20" />
        )}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 text-[200px] font-serif leading-none">诗</div>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            返回诗词列表
          </Link>

          <h1 className="font-serif text-3xl font-bold tracking-wider sm:text-4xl md:text-5xl">
            {poem.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/80">
            {poem.ciPai && (
              <span className="flex items-center gap-1">
                <ScrollText className="h-3.5 w-3.5" />
                {poem.ciPai}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {poem.year}年
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {poem.period}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {poem.themes.map((theme) => (
              <Badge
                key={theme}
                className="border-white/20 bg-white/10 text-white backdrop-blur-sm"
              >
                {theme}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Tab Navigation */}
        <div className="mb-8 flex gap-1 rounded-xl bg-muted p-1">
          {([
            { key: 'original' as const, label: '诗词原文', icon: ScrollText },
            { key: 'commentary' as const, label: '图文解说', icon: Lightbulb },
            { key: 'background' as const, label: '创作背景', icon: BookOpen },
          ]).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                activeSection === key
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Original Text Section */}
        {activeSection === 'original' && (
          <div className="animate-fade-up">
            <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 font-serif text-xl font-semibold">
                <ScrollText className="h-5 w-5 text-primary" />
                诗词原文
              </h2>

              <div className="flex justify-center">
                <div className="font-serif text-lg leading-loose tracking-wider sm:text-xl sm:leading-[2.5]">
                  {poem.content.map((line, i) =>
                    line.trim() === '' ? (
                      <div key={i} className="h-4" />
                    ) : (
                      <p key={i} className="text-foreground">
                        {line}
                      </p>
                    )
                  )}
                </div>
              </div>

              {poem.annotations.length > 0 && (
                <>
                  <Separator className="my-8" />
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-semibold">
                      <Tag className="h-4 w-4 text-primary" />
                      词句注释
                    </h3>
                    <div className="space-y-3">
                      {poem.annotations.map((ann, i) => (
                        <div
                          key={i}
                          className="rounded-lg bg-muted/50 px-4 py-3 text-sm"
                        >
                          <span className="font-semibold text-primary">
                            {ann.term}
                          </span>
                          <span className="mx-2 text-muted-foreground">——</span>
                          <span className="text-foreground/80">
                            {ann.explanation}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Commentary Section */}
        {activeSection === 'commentary' && (
          <div className="animate-fade-up">
            <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 font-serif text-xl font-semibold">
                <Lightbulb className="h-5 w-5 text-primary" />
                图文解说
              </h2>

              {/* Decorative image area */}
              <div
                className={`mb-8 flex h-48 items-center justify-center overflow-hidden rounded-xl sm:h-64`}
              >
                {poem.imageUrl ? (
                  <div className="relative h-full w-full">
                    <img
                      src={poem.imageUrl}
                      alt={poem.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="font-serif text-2xl font-bold tracking-widest sm:text-3xl">
                        {poem.title}
                      </p>
                      <p className="mt-1 text-sm text-white/80">{poem.year}年 · {poem.period}</p>
                    </div>
                  </div>
                ) : (
                  <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${poem.imageColor} text-white`}>
                    <div className="text-center">
                      <p className="font-serif text-3xl font-bold tracking-widest sm:text-4xl">
                        {poem.title}
                      </p>
                      <p className="mt-2 text-sm text-white/70">{poem.year}年 · {poem.period}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Key lines highlight */}
              <div className="mb-8 rounded-xl border border-primary/10 bg-primary/5 px-6 py-5">
                <p className="text-sm font-medium text-primary/80">名句摘录</p>
                {poem.content
                  .filter((l) => l.trim() !== '')
                  .slice(0, 3)
                  .map((line, i) => (
                    <p key={i} className="mt-2 font-serif text-lg leading-relaxed text-foreground/90">
                      {line}
                    </p>
                  ))}
              </div>

              {/* Commentary text */}
              <div className="prose prose-lg max-w-none">
                <p className="text-base leading-relaxed text-foreground/85">
                  {poem.commentary}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Background Section */}
        {activeSection === 'background' && (
          <div className="animate-fade-up">
            <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 font-serif text-xl font-semibold">
                <BookOpen className="h-5 w-5 text-primary" />
                创作背景
              </h2>

              {/* Timeline indicator */}
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-serif text-lg font-bold text-primary">
                    {poem.year}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">创作年份</p>
                  <p className="font-serif text-lg font-semibold">{poem.period}</p>
                </div>
              </div>

              <div className="rounded-xl bg-muted/50 px-6 py-5">
                <p className="text-base leading-relaxed text-foreground/85">
                  {poem.background}
                </p>
              </div>

              {/* Themes */}
              <div className="mt-6">
                <p className="mb-3 text-sm font-medium text-muted-foreground">主题标签</p>
                <div className="flex flex-wrap gap-2">
                  {poem.themes.map((theme) => (
                    <Badge key={theme} variant="secondary" className="text-sm">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation between poems */}
        <Separator className="my-8" />
        <NavButtons currentId={poem.id} />

        {/* Back to home */}
        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              返回诗词列表
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
