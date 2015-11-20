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

  constructor() {
    this._accessToken = null;
    this._accessTokenSecret = null;
    this._consumerKey = 'kj4cLg54JjVqnFuOm9NlSuvIC';
    this._consumerSecret = 'aCucG2eILi2JTem2EAlZhQzN5AlvU6KBfLZ70jxWjdifaB3wAZ';
  }

  bind() {
    app.on('window-all-closed', () => {
        if (process.platform != 'darwin') {
          app.quit();
        }
      })
      .on('ready', () => {
        this.onReady();
      });
  }

  onReady() {
    this.openAuthenicationWindow();
    this.setupMenu();
  }

  openAuthenicationWindow() {
    new AuthenticationWindow({
      consumerKey: this._consumerKey,
      consumerSecret: this._consumerSecret,
    });
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
