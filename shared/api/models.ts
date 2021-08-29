type Settings = {
  [key: string]: string;
};

type Article = {
  id: string;
  title: string;
  brief: string | null;
  content: string;
};

export { Settings, Article };
