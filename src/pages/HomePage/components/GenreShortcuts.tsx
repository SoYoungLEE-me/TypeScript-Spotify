import { Link } from "react-router";
import { Box, Typography } from "@mui/material";
import { GENRES } from "../../../utils/homeContent";

const GenreShortcuts = () => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "repeat(2, minmax(0, 1fr))",
        md: "repeat(4, minmax(0, 1fr))",
      },
      gap: 1.5,
    }}
  >
    {GENRES.map((genre) => (
      <Link
        key={genre.label}
        to={`/search/${encodeURIComponent(genre.keyword)}`}
      >
        <Box
          sx={{
            height: 88,
            p: 2,
            borderRadius: "8px",
            bgcolor: genre.color,
            transition: "transform 0.2s ease",
            "&:hover": { transform: "translateY(-4px)" },
          }}
        >
          <Typography fontWeight={700} sx={{ fontSize: "18px" }}>
            {genre.label}
          </Typography>
        </Box>
      </Link>
    ))}
  </Box>
);

export default GenreShortcuts;
