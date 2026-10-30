import { useState } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import useAddItemsToPlaylist from "../../../../hooks/useAddItemsToPlaylist";

interface AddTrackButtonProps {
  playlistId: string;
  uri: string;
  onAdded?: () => void;
}

const circleSx = { width: 32, height: 32 } as const;

const AddTrackButton = ({ playlistId, uri, onAdded }: AddTrackButtonProps) => {
  const { mutate: addItems, isPending } = useAddItemsToPlaylist();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addItems(
      { playlist_id: playlistId, uris: [uri] },
      {
        onSuccess: () => {
          setIsAdded(true);
          onAdded?.();
        },
      }
    );
  };

  if (isAdded) {
    return (
      <IconButton
        disabled
        aria-label="추가됨"
        sx={{
          ...circleSx,
          border: 1.5,
          borderColor: "primary.main",
          color: "primary.main !important",
        }}
      >
        <CheckIcon fontSize="small" />
      </IconButton>
    );
  }

  return (
    <IconButton
      onClick={handleAdd}
      disabled={isPending}
      aria-label="이 플레이리스트에 추가"
      sx={{
        ...circleSx,
        bgcolor: "primary.main",
        color: "#000",
        transition: "transform 0.15s",
        "&:hover": { bgcolor: "primary.main", transform: "scale(1.08)" },
        "&.Mui-disabled": { bgcolor: "primary.main", opacity: 0.6 },
      }}
    >
      {isPending ? (
        <CircularProgress size={16} sx={{ color: "#000" }} />
      ) : (
        <AddIcon fontSize="small" />
      )}
    </IconButton>
  );
};

export default AddTrackButton;
