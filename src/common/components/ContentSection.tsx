import { Link } from "react-router";
import { Box, Button, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface ContentSectionProps {
  title: string;
  caption?: string;
  moreTo?: string;
  onMore?: () => void;
  children: ReactNode;
}

const moreButtonSx = {
  color: "text.secondary",
  fontWeight: 700,
  flexShrink: 0,
};

const ContentSection = ({
  title,
  caption,
  moreTo,
  onMore,
  children,
}: ContentSectionProps) => (
  <Box component="section" sx={{ mb: 5 }}>
    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, mb: 1.5 }}>
      <Typography variant="h1">{title}</Typography>
      {caption && (
        <Typography variant="body2" color="text.secondary" noWrap>
          {caption}
        </Typography>
      )}
      <Box sx={{ flex: 1 }} />
      {moreTo && (
        <Button component={Link} to={moreTo} size="small" sx={moreButtonSx}>
          모두 보기
        </Button>
      )}
      {!moreTo && onMore && (
        <Button size="small" onClick={onMore} sx={moreButtonSx}>
          모두 보기
        </Button>
      )}
    </Box>
    {children}
  </Box>
);

export default ContentSection;
