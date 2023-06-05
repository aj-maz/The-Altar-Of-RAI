/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { LinearProgress, Typography } from "@mui/material";

const DataPanel = ({ children, progress }) => {
  return (
    <div
      css={(theme) =>
        css`
          background-color: ${theme.palette.background.paper};
          border-radius: 4px;
          overflow: hidden;
        `
      }
    >
      <Typography
        css={css`
          padding: 0.45em 1em;
        `}
        variant="body1"
      >
        {children}
      </Typography>
      {!!progress && (
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={progress}
        />
      )}
    </div>
  );
};
export default DataPanel;
