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

export interface NotionCheckbox {
  checkbox: boolean;
}

export interface NotionNumber {
  number: number;
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
    description?: NotionRichText;
    tags?: NotionMultiSelect;
    images?: {
      files: NotionFile[];
    };
    github_link?: NotionUrl;
    applink?: NotionUrl;
    live_link?: NotionUrl;
    applink_working?: NotionUrl;
    date?: NotionDate;
    type?: NotionSelect;
  };
}

export interface Experience {
  id: string;
  ID: number;
  properties: {
    Name?: NotionTitle;
    Role?: NotionRichText;
    ExperienceType?: NotionSelect;
    Duration?: NotionRichText;
    Badges?: NotionMultiSelect;
    Description?: NotionRichText;
    Image?: {
      files: NotionFile[];
    };
    BlogName?: NotionTitle;
    BlogLink?: NotionUrl;
  };
}

export interface Changelog {
  id: string;
  properties: {
    name?: NotionTitle;
    description?: NotionRichText;
    time?: NotionDate;
    icon?: NotionRichText;
    color?: NotionRichText;
  };
  created_time: string;
  last_edited_time: string;
}

export interface BucketList {
  id: string;
  properties: {
    no?: NotionNumber;
    goal?: NotionTitle;
    checked?: NotionCheckbox;
    value?: NotionNumber;
    link?: NotionUrl;
    icon?: NotionRichText;
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