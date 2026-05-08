export interface Annotation {
  term: string;
  explanation: string;
}

export interface Poem {
  id: string;
  title: string;
  ciPai?: string;
  year: string;
  period: string;
  content: string[];
  annotations: Annotation[];
  commentary: string;
  background: string;
  themes: string[];
  imageColor: string;
  imageUrl?: string;
}

export const PERIODS = [
  { id: "early", name: "青年时代", range: "1901-1924" },
  { id: "revolution", name: "革命战争", range: "1925-1935" },
  { id: "anti_japanese", name: "抗日战争", range: "1936-1945" },
  { id: "liberation", name: "解放战争", range: "1946-1949" },
  { id: "new_china", name: "新中国建设", range: "1950-1965" },
  { id: "late", name: "晚年时期", range: "1966-1976" },
] as const;
