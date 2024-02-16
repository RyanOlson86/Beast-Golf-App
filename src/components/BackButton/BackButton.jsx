import { Button } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BackButton = ({ text, path, icon, sxStyle}) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(path);
  };

  return (
    <Button
      variant="contained"
      size="large"
      onClick={handleClick}
      sx={sxStyle}
      startIcon={icon}
    >
      {text}
    </Button>
  );
};

export default BackButton;
