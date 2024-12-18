import { Switch } from "@mui/material";
import { styled } from "styled-components";
import moneySVG from "@/assets/icons/money.svg";
import percentageSVG from "@/assets/icons/percentagecircle.svg";
export const MaterialUISwitch = styled(Switch)(() => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url(${percentageSVG})`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#00A99D',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${moneySVG})`,
            filter: "invert(100%)", // Definir el color blanco
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#f2f2f2',
        borderRadius: 20 / 2,
    },
}));