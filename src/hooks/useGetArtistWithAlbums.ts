import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getArtist, getArtistAlbums } from "../apis/artistApi";
import type { SimplifiedAlbum } from "../models/album";
import { clientCredentialTokenQuery } from "./useClientCredentialToken";

const sortByLatest = (albums: SimplifiedAlbum[]) => {
  const seen = new Set<string>();
  return [...albums]
    .sort((a, b) => b.release_date.localeCompare(a.release_date))
    .filter((album) => {
      const name = album.name.toLowerCase();
      if (seen.has(name)) return false;
      seen.add(name);
      return true;
    });
};

const useGetArtistWithAlbums = (artistId: string, albumCount = 3) => {
  const queryClient = useQueryClient();

  return useSuspenseQuery({
    queryKey: ["artist-with-albums", artistId, albumCount],
    queryFn: async () => {
      const { access_token } = await queryClient.fetchQuery(
        clientCredentialTokenQuery
      );
      const albumParams = { market: "KR", limit: albumCount };

      const [artist, albumPage, singlePage] = await Promise.all([
        getArtist(access_token, artistId),
        getArtistAlbums(access_token, artistId, {
          ...albumParams,
          include_groups: "album",
        }),
        getArtistAlbums(access_token, artistId, {
          ...albumParams,
          include_groups: "single",
        }),
      ]);

      const albums = sortByLatest([
        ...albumPage.items,
        ...singlePage.items,
      ]).slice(0, albumCount);

      return { artist, albums };
    },
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetArtistWithAlbums;
