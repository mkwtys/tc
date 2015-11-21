/// <reference path="/typings/bundle.d.ts" />

/* @flow */

import AuthenticateWindow from './AuthenticateWindow';
import electron from 'electron';
import jsonfile from 'jsonfile';
import MainWindow from './MainWindow';

const app = electron.app;

export default class Application {
  _accessToken: string;
  _accessTokenSecret: string;
  _consumerKey: string;
  _consumerSecret: string;
  _mainWindow: MainWindow;

  constructor() {
    global.consumerKey = 'ANpNHJTRSTtnFZsjSnwIY1KSv';
    global.consumerSecret = 'Iza6ZGddrEk475o8DG7YR0JVH6LLjwZqOH7ZEWbs7txq22uOZR';
    global.twitterTokenPath = `${app.getPath('userData')}/twitter-token.json`;
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
    jsonfile.writeFile(global.twitterTokenPath, {accessToken, accessTokenSecret}, () => {});
    this.openMainWindow();
  }

  onReady() {
    let token = null;
    try {
      token = jsonfile.readFileSync(global.twitterTokenPath);
    } catch (error) {
      console.error(error);
    }

    if (token !== null && token.accessToken && token.accessTokenSecret) {
      this.openMainWindow();
    } else {
      this.openAuthenticateWindow();
    }

    this.setupMenu();
  }

  openAuthenticateWindow() {
    const authenticateWindow = new AuthenticateWindow({
      callback: 'https://github.com/mkwtys/tc',
      consumerKey: global.consumerKey,
      consumerSecret: global.consumerSecret
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
