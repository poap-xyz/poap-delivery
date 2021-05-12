import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useTheme, ITheme } from '@chakra-ui/core';

// Assets
import twitter from 'assets/images/twitter-logo.svg';
import twitterHover from 'assets/images/twitter-logo-hover.svg';
import github from 'assets/images/github-logo.svg';
import githubHover from 'assets/images/github-logo-hover.svg';
import reddit from 'assets/images/reddit-logo.svg';
import redditHover from 'assets/images/reddit-logo-hover.svg';
import telegram from 'assets/images/telegram-logo.svg';
import telegramHover from 'assets/images/telegram-logo-hover.svg';
import discord from 'assets/images/discord-logo.svg';
import discordHover from 'assets/images/discord-logo-hover.svg';

const CommunityContainer = styled.div<{ theme: ITheme }>`
  grid-area: 2 / 1 / 2 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: ${({ theme }) => theme.breakpoints['md']}) {
    grid-area: 1 / 3 / 2 / 4;
    align-items: flex-end;
  }

  h5 {
    color: ${({ theme }) => theme.colors.primaryColor};
    font-family: var(--alt-font);
    font-size: 16px;
    margin: 0 0 15px;
  }

  .social-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    a {
      height: 28px;
      width: 28px;
      display: inline-flex;
      margin: 8px;
      &:not(:last-child) {
        margin-right: 4px;
        @media (min-width: ${({ theme }) => theme.breakpoints['md']}) {
          margin-right: 8px;
        }
      }
      @media (min-width: ${({ theme }) => theme.breakpoints['md']}) {
        margin: 0px;
        height: 24px;
        width: 24px;
      }
    }
    .social-link {
      height: 100%;
      width: 100%;
      &.twitter {
        background: url(${twitter}) center / contain no-repeat;
        &:hover {
          background: url(${twitterHover}) center / contain no-repeat;
        }
      }
      &.github {
        background: url(${github}) center / contain no-repeat;
        &:hover {
          background: url(${githubHover}) center / contain no-repeat;
        }
      }
      &.telegram {
        background: url(${telegram}) center / contain no-repeat;
        &:hover {
          background: url(${telegramHover}) center / contain no-repeat;
        }
      }
      &.reddit {
        background: url(${reddit}) center / contain no-repeat;
        &:hover {
          background: url(${redditHover}) center / contain no-repeat;
        }
      }
      &.discord {
        background: url(${discord}) center / contain no-repeat;
        &:hover {
          background: url(${discordHover}) center / contain no-repeat;
        }
      }
    }
  }
`;

const Community: FC = () => {
  const theme = useTheme();
  return (
    <CommunityContainer theme={theme}>
      <h5>Join our Community!</h5>
      <div className="social-container">
        <a href="https://twitter.com/poapxyz" target="_blank" rel="noreferrer">
          <span className="social-link twitter" />
        </a>
        <a href="https://github.com/poap-xyz" target="_blank" rel="noreferrer">
          <span className="social-link github" />
        </a>
        <a href="https://t.me/poapxyz" target="_blank" rel="noreferrer">
          <span className="social-link telegram" />
        </a>
        <a href="https://discord.com/invite/9s8U8Bn" target="_blank" rel="noreferrer">
          <span className="social-link discord" />
        </a>
        <a href="https://www.reddit.com/r/poap/" target="_blank" rel="noreferrer">
          <span className="social-link reddit" />
        </a>
      </div>
    </CommunityContainer>
  );
};

export default Community;
