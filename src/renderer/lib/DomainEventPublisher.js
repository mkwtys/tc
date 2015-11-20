/* @flow */

import {EventEmitter} from 'events';

export default class DomainEventPublisher extends EventEmitter {
  constructor() {
    super();
  }
}
