type Settings = {
  [key: string]: string;
};

type SettingsOptions = {
  mainTitle: string;
  mainDescription: string;
  mainFooter: string;
  metaDescription: string;
  autosearchTresholdCount: string;
};

type ArticlePreview = {
  id: string;
  title: string;
  highlighted: boolean;
  keywordText?: string | null;
  brief?: string | null;
  author?: string | null;
  createdAt?: string | null;
  readingTimeInMinutes?: number | null;
};

type Article = ArticlePreview & {
  content: string;
};

export type { Settings, SettingsOptions, Article, ArticlePreview };
