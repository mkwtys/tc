/// <reference path="/typings/bundle.d.ts" />

/* @flow */

import BrowserWindow from 'browser-window';
import TwitterApi from 'node-twitter-api';

type AuthenticationWindowOptions = {
  callback: string,
  consumerKey: string,
  consumerSecret: string
}

export default class AuthenticationWindow {
  _window: BrowserWindow;
  constructor({callback, consumerKey, consumerSecret}: {
    callback: string,
    consumerKey: string,
    consumerSecret: string
  }) {
    const twitterApi = new TwitterApi({
      callback,
      consumerKey,
      consumerSecret
    });

    twitterApi.getRequestToken((error, requestToken, requestTokenSecret) => {
      const url = twitterApi.getAuthUrl(requestToken);
      this._window = new BrowserWindow({
        width: 800,
        height: 600,
        'node-integration': false
      });
      this.getAccessToken({twitterApi, requestToken, requestTokenSecret, url});
    });
  }

  getAccessToken({twitterApi, requestToken, requestTokenSecret, url}: {
    twitterApi: TwitterApi,
    requestToken: string,
    requestTokenSecret: string,
    url: string
  }) {
    this._window.webContents.on('will-navigate', (event, url) => {
      let matched;
      if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {
        twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) => {
          this.emit('authentication-succeeded', {
            accessToken,
            accessTokenSecret
          });
        });
        event.preventDefault();
        setImmediate(() => {
          this._window.close();
        });
      } else if (matched = url.match(/&redirect_after_login_verification=([^&]*)/)) {
        this._window.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl, isMainFrame) => {
          this.getAccessToken(twitter, requestToken, requestTokenSecret, newUrl);
        });
      };
    });
    this._window.loadURL(url);
  }
}
