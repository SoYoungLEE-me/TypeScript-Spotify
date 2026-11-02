import { useState } from "react";
import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

interface SearchHeaderProps {
  onSearch: (keyword: string) => void;
}

const SearchHeader = ({ onSearch }: SearchHeaderProps) => {
  const [value, setValue] = useState("");

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(value.trim());
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        height: 48,
        px: 2,
        borderRadius: "999px",
        bgcolor: "action.hover",
        border: "2px solid transparent",
        "&:focus-within": { borderColor: "text.primary" },
      }}
    >
      <SearchIcon sx={{ color: "text.secondary" }} />
      <InputBase
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="어떤 곡을 듣고 싶으세요?"
        fullWidth
        sx={{ fontSize: "15px" }}
      />
      {value && (
        <IconButton
          size="small"
          onClick={() => setValue("")}
          aria-label="검색어 지우기"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default SearchHeader;
