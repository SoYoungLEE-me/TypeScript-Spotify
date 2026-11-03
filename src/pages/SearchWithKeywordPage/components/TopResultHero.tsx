import { Link } from "react-router";
import { Box, Button, Typography } from "@mui/material";
import CoverImage from "../../../common/components/CoverImage";
import AddToPlaylistButton from "../../../common/components/Playlist/AddToPlaylistButton";
import { getTopResultImage, type TopResult } from "../utils/pickTopResult";

interface TopResultHeroProps {
  top: TopResult;
  onShowArtistTracks: (artistName: string) => void;
}

const TopResultHero = ({ top, onShowArtistTracks }: TopResultHeroProps) => {
  const isArtist = top.kind === "artist";

  const label = {
    artist: "아티스트",
    album: "앨범",
    track: "곡",
  }[top.kind];

  const subText =
    top.kind === "artist"
      ? null
      : `${top.item.artists.map((artist) => artist.name).join(", ")}${
          top.kind === "album" ? ` · ${top.item.release_date.slice(0, 4)}` : ""
        }`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "flex-end" },
        gap: 3,
        mt: 3,
      }}
    >
      <CoverImage
        src={getTopResultImage(top)}
        alt={top.item.name}
        size={160}
        radius={isArtist ? "50%" : "8px"}
        shadow
      />

      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body2" fontWeight={700}>
          가장 잘 맞는 결과 · {label}
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "28px", md: "44px" },
            fontWeight: 900,
            my: 1,
            wordBreak: "keep-all",
          }}
        >
          {top.item.name}
        </Typography>
        {subText && <Typography color="text.secondary">{subText}</Typography>}

        <Box sx={{ mt: 2 }}>
          {top.kind === "artist" && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onShowArtistTracks(top.item.name)}
            >
              곡 보기
            </Button>
          )}
          {top.kind === "album" && (
            <Button
              component={Link}
              to={`/album/${top.item.id}`}
              variant="contained"
              color="secondary"
            >
              앨범 보기
            </Button>
          )}
          {top.kind === "track" && (
            <AddToPlaylistButton
              uris={[top.item.uri]}
              label="플레이리스트에 담기"
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TopResultHero;
