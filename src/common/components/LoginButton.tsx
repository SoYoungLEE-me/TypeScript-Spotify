import { Button } from "@mui/material";

const LoginButton = () => {
  const login = () => {
    console.log("login clicked");
  };

  return (
    <Button variant="contained" color="secondary" size="large" onClick={login}>
      Log in
    </Button>
  );
};

export default LoginButton;
