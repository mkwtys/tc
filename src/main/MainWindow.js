/// <reference path="/typings/bundle.d.ts" />

/* @flow */

import BrowserWindow from 'browser-window';

export default class MainWindow {
  constructor() {
    this._window = new BrowserWindow({
      width: 1200,
      height: 800
    });
    this._window.loadURL(`file://${__dirname}/../renderer/index.html`);
    this._window.on('closed', () => {
      this._window.destroy();
    });
  }
}
