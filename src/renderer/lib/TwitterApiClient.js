/// <reference path="/typings/bundle.d.ts" />

/* @flow */

import Twitter from 'twitter';

export default class TwitterApiClient {
  _twitterClient: Twitter;

  constructor({accessToken, accessTokenSecret, consumerKey, consumerSecret}: {
    accessToken: string,
    accessTokenSecret: string,
    consumerKey: string,
    consumerSecret: string
  }) {
    this._twitterClient = new Twitter({
      accessToken,
      accessTokenSecret,
      consumerKey,
      consumerSecret
    });
  }
}
