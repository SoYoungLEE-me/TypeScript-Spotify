import { useState } from "react";
import {
  Alert,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Snackbar,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import useAddItemsToPlaylist from "../../../hooks/useAddItemsToPlaylist";
import { getSpotifyAuthUrl } from "../../../utils/auth";
import CoverImage from "../../components/CoverImage";

interface AddToPlaylistButtonProps {
  uris: string[]; // 추가할 곡들 uri
  label?: string; // 넘기면 글자 버튼, 안 넘기면 + 아이콘 버튼
}

type Toast = { severity: "success" | "error"; message: string } | null;

const AddToPlaylistButton = ({ uris, label }: AddToPlaylistButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [toast, setToast] = useState<Toast>(null);

  const { data: user } = useGetCurrentUserProfile();
  const { data, hasNextPage, fetchNextPage } = useGetCurrentUserPlaylists({
    limit: 10,
  });
  const { mutate: addItems, isPending } = useAddItemsToPlaylist();

  // 곡을 넣을 수 있는 건 내가 만든 플레이리스트뿐
  const myPlaylists =
    data?.pages
      .flatMap((page) => page.items)
      .filter(
        (playlist) => playlist.owner.id === user?.id || playlist.collaborative
      ) ?? [];

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // 줄 전체 클릭 같은 바깥 이벤트로 번지지 않게
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => setAnchorEl(null);

  const handleSelect = (playlistId: string, playlistName: string) => {
    closeMenu();
    addItems(
      { playlist_id: playlistId, uris },
      {
        onSuccess: () =>
          setToast({
            severity: "success",
            message: `'${playlistName}'에 ${uris.length}곡을 추가했어요`,
          }),
        onError: () =>
          setToast({
            severity: "error",
            message: "추가하지 못했어요. 다시 시도해 주세요",
          }),
      }
    );
  };

  return (
    <>
      {label ? (
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={openMenu}
          disabled={isPending}
          sx={{ fontWeight: 700 }}
        >
          {label}
        </Button>
      ) : (
        <Tooltip title="플레이리스트에 추가">
          <IconButton
            size="small"
            onClick={openMenu}
            disabled={isPending}
            aria-label="플레이리스트에 추가"
            sx={{
              color: "text.secondary",
              "&:hover": { color: "text.primary" },
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        onClick={(event) => event.stopPropagation()}
        slotProps={{ paper: { sx: { maxHeight: 360, minWidth: 240 } } }}
      >
        {!user ? (
          // 로그인 안 했으면 로그인부터 안내
          <MenuItem onClick={() => getSpotifyAuthUrl()}>
            <ListItemIcon>
              <LoginIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="로그인하고 담기" />
          </MenuItem>
        ) : (
          [
            <ListSubheader key="title">내 플레이리스트에 추가</ListSubheader>,

            myPlaylists.length === 0 && (
              <MenuItem key="empty" disabled>
                곡을 넣을 수 있는 플레이리스트가 없어요
              </MenuItem>
            ),

            ...myPlaylists.map((playlist) => (
              <MenuItem
                key={playlist.id}
                onClick={() => handleSelect(playlist.id, playlist.name)}
                sx={{ gap: 1.5 }}
              >
                <CoverImage src={playlist.images?.[0]?.url} size={32} />
                <ListItemText
                  primary={playlist.name}
                  slotProps={{ primary: { noWrap: true } }}
                />
              </MenuItem>
            )),

            hasNextPage && (
              <MenuItem key="more" onClick={() => fetchNextPage()}>
                <ListItemText
                  primary="더 보기"
                  slotProps={{ primary: { color: "text.secondary" } }}
                />
              </MenuItem>
            ),
          ]
        )}
      </Menu>

      <Snackbar
        open={toast !== null}
        autoHideDuration={2500}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {toast ? (
          <Alert
            severity={toast.severity}
            variant="filled"
            onClose={() => setToast(null)}
          >
            {toast.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </>
  );
};

export default AddToPlaylistButton;
