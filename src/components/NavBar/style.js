import { styled } from "@material-ui/styles";
import DropdownBox from "../DropdownBox";

const NavBarContainer = styled(DropdownBox)(({ theme }) => ({
    "& .header": {
        display: "flex",
        padding: theme.spacing(2),
        alignItems: "flex-start",

        "& .user-avatar": {
            cursor: "pointer",
        },

        "& .user-info": {
            marginLeft: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        },
        "& .user-name": {
            lineHeight: 1,
            fontSize: theme.spacing(2),
        },
        "& .user-email": {
            marginBottom: theme.spacing(1),
        },
        "& a": {
            color: theme.palette.text.link,
        },
    },
}));

export { NavBarContainer };
