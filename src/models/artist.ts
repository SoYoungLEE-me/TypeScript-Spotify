import type { Image, ExternalUrls } from "./commonType";

export interface SimplifiedArtist {
  id: string;
  name: string;
  external_urls: ExternalUrls;
}

export interface Artist extends SimplifiedArtist {
  images: Image[];
  uri: string;
}
