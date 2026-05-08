import { notFound } from 'next/navigation';
import { poems, getPoemById } from '@/lib/poems-data';
import type { Metadata } from 'next';
import PoemDetailClient from './PoemDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return poems.map((poem) => ({
    id: poem.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const poem = getPoemById(id);
  if (!poem) {
    return { title: '诗词未找到' };
  }
  return {
    title: poem.title,
    description: poem.commentary.slice(0, 100),
  };
}

export default async function PoemPage({ params }: PageProps) {
  const { id } = await params;
  const poem = getPoemById(id);

  if (!poem) {
    notFound();
  }

  return <PoemDetailClient poem={poem} />;
}
