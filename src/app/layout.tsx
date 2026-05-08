import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '毛泽东诗词鉴赏',
    template: '%s | 毛泽东诗词鉴赏',
  },
  description:
    '收录毛泽东全部诗词作品，含原文、注释、图文解说与创作背景，感受伟人诗词的磅礴气象与深邃思想。',
  keywords: [
    '毛泽东诗词',
    '沁园春·雪',
    '沁园春·长沙',
    '七律·长征',
    '毛泽东',
    '诗词鉴赏',
    '古典诗词',
  ],
  authors: [{ name: '毛泽东诗词鉴赏' }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
