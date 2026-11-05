import { useState } from "react";
import { Box, Chip } from "@mui/material";
import useGetGenreTracks from "../../../hooks/useGetGenreTracks";
import TrackRowSkeleton from "../../../common/Track/TrackRowSkeleton";
import EmptyState from "../../../common/components/EmptyState";
import { GENRES } from "../utils/homeContent";
import TrackColumns from "./TrackColumns";

const GenreTracks = () => {
  const [query, setQuery] = useState(GENRES[0].query);
  const year = new Date().getFullYear();
  const { data, isLoading, isError, isPlaceholderData } = useGetGenreTracks(
    query,
    year
  );
  const tracks = data?.tracks?.items.slice(0, 6) ?? [];

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
        {GENRES.map((item) => {
          const isActive = item.query === query;
          return (
            <Chip
              key={item.query}
              label={item.label}
              onClick={() => setQuery(item.query)}
              sx={{
                fontWeight: 700,
                bgcolor: isActive ? "primary.main" : "action.hover",
                color: isActive ? "#000" : "text.primary",
                "&:hover": {
                  bgcolor: isActive ? "primary.main" : "action.active",
                },
              }}
            />
          );
        })}
      </Box>

      {isLoading ? (
        <TrackRowSkeleton count={6} compact />
      ) : isError ? (
        <EmptyState>곡을 불러오지 못했어요.</EmptyState>
      ) : tracks.length === 0 ? (
        <EmptyState>이 장르의 올해 곡을 찾지 못했어요.</EmptyState>
      ) : (
        <Box
          sx={{
            opacity: isPlaceholderData ? 0.5 : 1,
            transition: "opacity 0.2s",
          }}
        >
          <TrackColumns tracks={tracks} />
        </Box>
      )}
    </Box>
  );
};

export default GenreTracks;
