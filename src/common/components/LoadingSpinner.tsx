import { useTheme } from "@mui/material";
import { PuffLoader } from "react-spinners";

const LoadingSpinner = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px 0",
      }}
    >
      <PuffLoader color={theme.palette.primary.main} size={60} />
    </div>
  );
};

export default LoadingSpinner;
