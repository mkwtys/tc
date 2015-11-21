/// <reference path="/typings/bundle.d.ts" />

/* @flow */

import electron from 'electron';
import {EventEmitter} from 'events';
import TwitterApi from 'node-twitter-api';

const BrowserWindow = electron.BrowserWindow;

export default class AuthenticateWindow extends EventEmitter {
  _window: BrowserWindow;

  constructor({callback, consumerKey, consumerSecret}) {
    super();
    this.setTwitterApi({callback, consumerKey, consumerSecret});
  }

  getAccessToken({twitterApi, requestToken, requestTokenSecret, url}: {
    twitterApi: TwitterApi,
    requestToken: string,
    requestTokenSecret: string,
    url: string
  }) {
    this._window.webContents.on('will-navigate', (event, url) => {
      let matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/);
      if (matched) {
        twitterApi.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) => {
          twitterApi.verifyCredentials(accessToken, accessTokenSecret, (error, profile/*, response*/) => {
            this.emit('authenticate:succeeded', {
              accessToken,
              accessTokenSecret,
              profile
            });
          });
        });
        event.preventDefault();
        setImmediate(() => {
          this._window.close();
        });
        return;
      }

      matched = url.match(/&redirect_after_login_verification=([^&]*)/);
      if (matched) {
        this._window.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl/*, isMainFrame*/) => {
          this.getAccessToken(twitterApi, requestToken, requestTokenSecret, newUrl);
        });
      }
    });
    this._window.loadURL(url);
  }

  setTwitterApi({callback, consumerKey, consumerSecret}) {
    const twitterApi = new TwitterApi({
      callback,
      consumerKey,
      consumerSecret
    });

    twitterApi.getRequestToken((error, requestToken, requestTokenSecret) => {
      const url = twitterApi.getAuthUrl(requestToken);
      this.setWindow();
      this.getAccessToken({twitterApi, requestToken, requestTokenSecret, url});
    });
  }

  setWindow() {
    this._window = new BrowserWindow({
      width: 1200,
      height: 800,
      'node-integration': false
    });
  }
}
