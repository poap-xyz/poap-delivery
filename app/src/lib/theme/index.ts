import { css } from '@emotion/core';

export const mainStyles = css`
  :root {
    /* fonts */
    --main-font: 'Archivo', sans-serif;
    --alt-font: 'Archivo Narrow', sans-serif;
    --mix-font: 'Roboto', sans-serif;
  }

  a:hover {
    text-decoration: none !important;
  }

  ::placeholder {
    color: #ccced9 !important;
  }

  /* Web3 Modal Hack*/
  #WEB3_CONNECT_MODAL_ID {
    position: relative;
    z-index: 50;
  }

  button {
    &:focus {
      box-shadow: none !important;
    }
  }
`;
