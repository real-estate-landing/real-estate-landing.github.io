import uz from "../../../assets/images/uzbekistan.jpg";
import ru from "../../../assets/images/russia.jpg";
import en from "../../../assets/images/england.jpg";
import { makeStyles } from "../../../styles";

type Props = {
  lang: "uz" | "en" | "ru";
};

const useStyles = makeStyles()((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
  flag: {
    width: "25px",
    aspectRatio: "2/1.5",
    objectFit: "cover",
    objectPosition: "center",
  },
}));
function Flag({ lang }: Props) {
  const { classes } = useStyles();
  const flag = (lang == "uz"
    ? uz
    : lang == "en"
    ? en
    : ru) as unknown as string;
  return <img src={flag} alt="flag" className={classes.flag} loading="lazy" />;
}

export default Flag;
