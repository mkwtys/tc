/// <reference path="/typings/bundle.d.ts" />

/* @flow */

import electron from 'electron';
import AuthenticationWindow from './AuthenticationWindow';
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

  onAuthenticationSucceeded({accessToken, accessTokenSecret}) {
    this._accessToken = accessToken;
    this._accessTokenSecret = accessTokenSecret;
    this.openMainWindow();
  }

  onReady() {
    this.openAuthenicationWindow();
    this.setupMenu();
  }

  openAuthenicationWindow() {
    const authenticationWindow = new AuthenticationWindow({
      callback: 'https://github.com/mkwtys/tc',
      consumerKey: this._consumerKey,
      consumerSecret: this._consumerSecret
    });
    authenticationWindow.on('authentication:succeeded', (payload) => {
      this.onAuthenticationSucceeded(payload);
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
