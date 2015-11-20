declare module twitter {
  declare class exports {
    constructor(options: Object): void;
    get(url: string, params: Object, callback: Function): void;
    post(url: string, params: Object, callback: Function): void;
    stream(method: string, params: Object, callback: Function): void;
  }
}
