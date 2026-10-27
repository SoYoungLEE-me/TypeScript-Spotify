import type { ExternalUrls } from "./commonType";
import type { SimplifiedAlbum, SimplifiedArtist } from "./album";

export interface Track {
  id: string;
  name: string;
  duration_ms: number;
  explicit: boolean;
  track_number: number;
  disc_number: number;
  artists: SimplifiedArtist[];
  album: SimplifiedAlbum;
  external_urls: ExternalUrls;
  uri: string;
  is_local: boolean;
}
