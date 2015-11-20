/// <reference path="/typings/bundle.d.ts" />

/* @flow */

import {EventEmitter} from 'events';
import Twitter from 'twitter';

type TwitterApiClientOptions = {
  accessToken: string,
  accessTokenSecret: string,
  consumerKey: string,
  consumerSecret: string
}

export default class TwitterApiClient {
  _twitterClient: twitter;

  constructor({accessToken, accessTokenSecret, consumerKey, consumerSecret}: TwitterApiClientOptions) {
    this._twitterClient = new Twitter({
      accessToken,
      accessTokenSecret,
      consumerKey,
      consumerSecret
    });
  }
}
