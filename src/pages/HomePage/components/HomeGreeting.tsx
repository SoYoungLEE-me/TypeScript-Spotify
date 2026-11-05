import { Link } from "react-router";
import { Box, Skeleton, Typography } from "@mui/material";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import CoverImage from "../../../common/components/CoverImage";
import { getGreeting } from "../utils/homeContent";

const tileGridSx = {
  display: "grid",
  gridTemplateColumns: {
    xs: "repeat(2, minmax(0, 1fr))",
    md: "repeat(4, minmax(0, 1fr))",
  },
  gap: 1,
};

const HomeGreeting = () => {
  const { data: user } = useGetCurrentUserProfile();
  const { data, isPending } = useGetCurrentUserPlaylists({ limit: 10 });
  const playlists = data?.pages[0]?.items.slice(0, 8) ?? [];

  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography
        variant="h1"
        sx={{ fontSize: { xs: "24px", md: "32px" }, mb: 2 }}
      >
        {getGreeting(new Date().getHours())}
        {user?.display_name && `, ${user.display_name}님`}
      </Typography>

      <Box sx={tileGridSx}>
        {isPending
          ? Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} variant="rounded" height={56} />
            ))
          : playlists.map((playlist) => (
              <Link
                key={playlist.id}
                to={`/playlist/${playlist.id}`}
                style={{ minWidth: 0 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    height: 56,
                    pr: 1.5,
                    borderRadius: "6px",
                    overflow: "hidden",
                    bgcolor: "action.hover",
                    transition: "background-color 0.2s ease",
                    "&:hover": { bgcolor: "action.active" },
                  }}
                >
                  <CoverImage
                    src={playlist.images?.[0]?.url}
                    alt={playlist.name}
                    size={56}
                    radius={0}
                  />
                  <Typography noWrap fontWeight={700} title={playlist.name}>
                    {playlist.name}
                  </Typography>
                </Box>
              </Link>
            ))}
      </Box>
    </Box>
  );
};

export default HomeGreeting;
