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