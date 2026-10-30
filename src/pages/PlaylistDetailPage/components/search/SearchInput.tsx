import { useRef } from "react";
import {
  Box,
  Chip,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  recentSearches: string[];
  activeKeyword: string;
  onSelectRecent: (keyword: string) => void;
  onRemoveRecent: (keyword: string) => void;
}

const SearchInput = ({
  value,
  onChange,
  onClear,
  onSubmit,
  recentSearches,
  activeKeyword,
  onSelectRecent,
  onRemoveRecent,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  return (
    <Box>
      <TextField
        fullWidth
        autoFocus
        inputRef={inputRef}
        placeholder="추가할 곡 검색"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") onSubmit();
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
            endAdornment: value && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClear}
                  aria-label="검색어 지우기"
                  sx={{ color: "text.secondary" }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: "999px",
              bgcolor: "rgba(0, 0, 0, 0.45)",
              height: 48,
              px: 1,
            },
          },
        }}
        sx={{ "& fieldset": { border: "none" } }}
      />

      {recentSearches.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1.5 }}>
          {recentSearches.map((recent) => {
            const isActive = recent === activeKeyword;
            return (
              <Chip
                key={recent}
                label={recent}
                size="small"
                onClick={() => onSelectRecent(recent)}
                onDelete={() => onRemoveRecent(recent)}
                sx={{
                  fontWeight: 700,
                  bgcolor: isActive ? "primary.main" : "rgba(0, 0, 0, 0.35)",
                  color: isActive ? "#000" : "text.secondary",
                  "&:hover": {
                    bgcolor: isActive ? "primary.main" : "rgba(0, 0, 0, 0.55)",
                  },
                  "& .MuiChip-deleteIcon": {
                    color: isActive ? "#000" : "text.secondary",
                    fontSize: 16,
                  },
                }}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default SearchInput;
