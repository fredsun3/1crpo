import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-red-950/5 to-amber-950/5 px-4">
      <BookOpen className="mb-6 h-16 w-16 text-primary/30" />
      <h1 className="font-serif text-3xl font-bold tracking-wider">诗词未找到</h1>
      <p className="mt-3 text-muted-foreground">
        您所寻找的诗词不在收录范围内
      </p>
      <Link href="/" className="mt-6">
        <Button>返回首页</Button>
      </Link>
    </div>
  );
}
