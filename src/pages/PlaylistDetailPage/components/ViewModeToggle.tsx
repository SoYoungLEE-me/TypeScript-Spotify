import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";

export type ViewMode = "list" | "grid";

interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const ViewModeToggle = ({ value, onChange }: ViewModeToggleProps) => {
  return (
    <ToggleButtonGroup
      size="small"
      exclusive
      value={value}
      onChange={(_event, mode: ViewMode | null) => {
        if (mode) onChange(mode);
      }}
      sx={{
        "& .MuiToggleButton-root": {
          color: "text.secondary",
          border: "none",
          borderRadius: "6px !important",
        },
        "& .Mui-selected": {
          color: "text.primary !important",
          bgcolor: "action.hover !important",
        },
      }}
    >
      <ToggleButton
        value="list"
        aria-label="목록으로 보기"
        title="목록으로 보기"
      >
        <ViewListIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value="grid" aria-label="카드로 보기" title="카드로 보기">
        <GridViewIcon fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewModeToggle;
