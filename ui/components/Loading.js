/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useTheme, Typography } from "@mui/material";
import CircleLoader from "react-spinners/CircleLoader";

const Loading = () => {
  const theme = useTheme();

  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <CircleLoader color={theme.palette.secondary.main} />
      <Typography
        css={(theme) =>
          css`
            color: ${theme.palette.secondary.main};
            margin-left: 1em;
          `
        }
        variant="h5"
      >
        Altar Of RAI
      </Typography>
    </div>
  );
};
export default Loading;
