import { Typography, Link } from "@mui/material";

export const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Disertation Managment
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}