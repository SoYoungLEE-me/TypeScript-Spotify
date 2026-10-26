export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export interface Owner {
  id: string;
  display_name: string | null;
  external_urls?: ExternalUrls;
}

export interface ExternalUrls {
  spotify: string;
}

export interface ApiResponse<T> {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: T[];
}
