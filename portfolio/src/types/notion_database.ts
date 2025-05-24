export interface NotionFile {
  file: {
    url: string;
  };
}

export interface NotionTitle {
  title: {
    plain_text: string;
  }[];
}

export interface NotionRichText {
  rich_text: {
    plain_text: string;
  }[];
}

export interface NotionDate {
  date: {
    start: string;
  };
}

export interface NotionSelect {
  select: {
    name: string;
  };
}

export interface NotionMultiSelect {
  multi_select: {
    id: string;
    name: string;
  }[];
}

export interface NotionUrl {
  url: string;
}

export interface BlogPost {
  id: string;
  properties: {
    HeaderImage?: {
      files: NotionFile[];
    };
    Title?: NotionTitle;
    Description?: NotionRichText;
    Date?: NotionDate;
    Status?: NotionSelect;
  };
}

export interface Project {
  id: string;
  properties: {
    name?: NotionTitle;
    Name?: NotionTitle;
    description?: NotionRichText;
    Description?: NotionRichText;
    tags?: NotionMultiSelect;
    Tags?: NotionMultiSelect;
    images?: {
      files: NotionFile[];
    };
    Images?: {
      files: NotionFile[];
    };
    github_link?: NotionUrl;
    GitHubLink?: NotionUrl;
    applink?: NotionUrl;
    live_link?: NotionUrl;
    LiveLink?: NotionUrl;
    applink_working?: NotionUrl;
    date?: NotionDate;
    type?: NotionSelect;
  };
}

export interface NotionDatabase {
  Title: string;
  HeaderImage: string;
  image: string;
  Content: string;
  Tags: string[];
  links: string;
  Date: string; // ISO 8601 format
  Status: string;
}