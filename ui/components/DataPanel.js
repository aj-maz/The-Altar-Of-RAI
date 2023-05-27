/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { LinearProgress, Paper } from "@mui/material";

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
      <div
        css={css`
          padding: 0.45em 1em;
        `}
      >
        {children}
      </div>
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
