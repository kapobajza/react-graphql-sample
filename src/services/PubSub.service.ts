import { singleton } from 'tsyringe';

import { SubscribeCallback, SubscribeCallbackParams } from './types';

export interface IPubSubService {
  subscribe<TName extends keyof SubscribeCallbackParams = any>(
    event: TName,
    cb: (data: SubscribeCallbackParams[TName]) => void,
  ): () => void;
  publish<TName extends keyof SubscribeCallbackParams = any>(
    ...args: SubscribeCallbackParams[TName] extends undefined
      ? [TName]
      : [TName, SubscribeCallbackParams[TName]]
  ): void;
  unsubscribeAll(): void;
}

@singleton()
export class PubSubService implements IPubSubService {
  private subscribers: Record<string, SubscribeCallback[]> = {};

  subscribe<TName extends keyof SubscribeCallbackParams = any>(
    event: TName,
    cb: (data: SubscribeCallbackParams[TName]) => void,
  ) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }

    const index = this.subscribers[event].push(cb) - 1;

    return () => {
      this.subscribers[event]?.splice(index, 1);
    };
  }

  publish<TName extends keyof SubscribeCallbackParams = any>(
    ...args: SubscribeCallbackParams[TName] extends undefined
      ? [TName]
      : [TName, SubscribeCallbackParams[TName]]
  ) {
    const [event, data] = args;

    if (!this.subscribers[event]) {
      return;
    }

    this.subscribers[event].forEach((cb) => cb(data));
  }

  unsubscribeAll(): void {
    this.subscribers = {};
  }
}
