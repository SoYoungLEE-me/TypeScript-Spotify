import { Box, Typography } from "@mui/material";
import CoverImage from "../components/CoverImage";

interface TrackTitleProps {
  name: string;
  subText: string; // 가수 이름 등등..
  explicit?: boolean;
  thumbnail?: string; // 넘기면 왼쪽에 작은 커버를 보여준다
}

// 곡 제목 + 19금(E) 배지 + 가수 이름, 길면 자르기
const TrackTitle = ({
  name,
  subText,
  explicit,
  thumbnail,
}: TrackTitleProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
      {thumbnail !== undefined && <CoverImage src={thumbnail} size={40} />}

      <Box sx={{ minWidth: 0 }}>
        <Typography noWrap fontWeight={700}>
          {name}
        </Typography>
        <Typography noWrap variant="body2" color="text.secondary">
          {explicit && (
            <Box
              component="span"
              sx={{
                display: "inline-block",
                px: 0.5,
                mr: 0.75,
                borderRadius: "2px",
                bgcolor: "text.secondary",
                color: "background.paper",
                fontSize: "10px",
                fontWeight: 700,
                lineHeight: "16px",
              }}
            >
              E
            </Box>
          )}
          {subText}
        </Typography>
      </Box>
    </Box>
  );
};

export default TrackTitle;
