import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getArtist, getArtistAlbums } from "../apis/artistApi";
import { clientCredentialTokenQuery } from "./useClientCredentialToken";

const useGetArtistWithAlbums = (artistId: string, albumCount = 3) => {
  const queryClient = useQueryClient();

  return useSuspenseQuery({
    queryKey: ["artist-with-albums", artistId, albumCount],
    queryFn: async () => {
      const { access_token } = await queryClient.fetchQuery(
        clientCredentialTokenQuery
      );

      const [artist, albumPage] = await Promise.all([
        getArtist(access_token, artistId),
        getArtistAlbums(access_token, artistId, {
          include_groups: "album,single",
          market: "KR",
          limit: 10,
        }),
      ]);

      const albums = [...albumPage.items]
        .sort((a, b) => b.release_date.localeCompare(a.release_date))
        .slice(0, albumCount);

      return { artist, albums };
    },
    staleTime: 1000 * 60 * 60,
  });
};

export default useGetArtistWithAlbums;
