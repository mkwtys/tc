/// <reference path="/typings/bundle.d.ts" />

/* @flow */

import electron from 'electron';
import AuthenticateWindow from './AuthenticateWindow';
import MainWindow from './MainWindow';

const app = electron.app;

export default class Application {
  _accessToken: string;
  _accessTokenSecret: string;
  _consumerKey: string;
  _consumerSecret: string;
  _mainWindow: MainWindow;

  constructor() {
    this._accessToken = null;
    this._accessTokenSecret = null;
    this._consumerKey = 'ANpNHJTRSTtnFZsjSnwIY1KSv';
    this._consumerSecret = 'Iza6ZGddrEk475o8DG7YR0JVH6LLjwZqOH7ZEWbs7txq22uOZR';
  }

  bind() {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    })
    .on('ready', () => {
      this.onReady();
    });
  }

  onAuthenticateSucceeded({accessToken, accessTokenSecret}) {
    this._accessToken = accessToken;
    this._accessTokenSecret = accessTokenSecret;
    this.openMainWindow();
  }

  onReady() {
    this.openAuthenticateWindow();
    this.setupMenu();
  }

  openAuthenticateWindow() {
    const authenticateWindow = new AuthenticateWindow({
      callback: 'https://github.com/mkwtys/tc',
      consumerKey: this._consumerKey,
      consumerSecret: this._consumerSecret
    });
    authenticateWindow.on('authenticate:succeeded', (payload) => {
      this.onAuthenticateSucceeded(payload);
    });
  }

  openMainWindow() {
    this._mainWindow = new MainWindow();
  }

  run() {
    this.startCrashReporter();
    this.bind();
  }

  setupMenu() {
  }

  startCrashReporter() {
    electron.crashReporter.start();
  }
}
