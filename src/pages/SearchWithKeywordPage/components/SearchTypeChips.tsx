import { Box, Chip } from "@mui/material";
import { SEARCH_TABS, type SearchTab } from "../utils/searchTab";

interface SearchTypeChipsProps {
  value: SearchTab;
  onChange: (tab: SearchTab) => void;
}

const SearchTypeChips = ({ value, onChange }: SearchTypeChipsProps) => {
  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
      {SEARCH_TABS.map((tab) => {
        const isActive = tab.value === value;
        return (
          <Chip
            key={tab.value}
            label={tab.label}
            onClick={() => onChange(tab.value)}
            sx={{
              fontWeight: 700,
              bgcolor: isActive ? "primary.main" : "rgba(0, 0, 0, 0.35)",
              color: isActive ? "#000" : "text.primary",
              "&:hover": {
                bgcolor: isActive ? "primary.main" : "rgba(0, 0, 0, 0.55)",
              },
            }}
          />
        );
      })}
    </Box>
  );
};

export default SearchTypeChips;
