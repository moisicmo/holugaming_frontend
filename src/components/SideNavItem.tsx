import { Box, ButtonBase, SvgIcon } from "@mui/material";
import { Link } from "react-router-dom";

export const SideNavItem = ({
  active = false,
  icon = null,
  path = null,
  title = null,
  isTitle = false,
}: {
  active: any;
  icon: any;
  path: any;
  title?: any;
  isTitle?: any;
}) => {
  const linkProps = path ? { component: Link, to: path } : {};

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: "center",
          borderRadius: 2,
          display: "flex",
          justifyContent: "flex-start",
          pl: !isTitle && "16px",
          pr: !isTitle && "16px",
          py: "6px",
          my: "2px",
          textAlign: "left",
          width: "100%",
          ...(active && {
            backgroundColor: "#f6f7fd",
          }),
          ...(!active && {
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.04)",
            },
          }),
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: "center",
              color: "neutral.100",
              display: "inline-flex",
              justifyContent: "center",
              mr: 2,
            //   ...(active && {
            //     color: "primary.lightest",
            //   }),
            }}
          >
            <SvgIcon fontSize="small">{icon}</SvgIcon>
          </Box>
        )}
        <Box
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};
