type Settings = {
  [key: string]: string;
};

type SettingsOptions = {
  mainTitle: string;
  mainDescription: string;
};

type ArticlePreview = {
  id: string;
  title: string;
  keyworkText?: string | null;
  brief?: string | null;
  author?: string | null;
  createdAt?: string | null;
  readingTimeInMinutes?: number | null;
};

type Article = ArticlePreview & {
  content: string;
};

export type { Settings, SettingsOptions, Article, ArticlePreview };
