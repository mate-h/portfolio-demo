import { fade, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

export const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "20px 20px",
    backgroundPosition: "10px center",
    borderRadius: theme.shape.borderRadius,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    height: 16,
    padding: "10px 12px 10px 36px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);
