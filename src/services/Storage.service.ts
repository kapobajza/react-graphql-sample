import { injectable } from 'tsyringe';

import { StorageKey } from '../types/models';
import { isJsonParsable, parseJson } from '../util';

export interface IStorageService {
  clear(): void;
  getAccessToken(): string | undefined;
  setAccessToken(token: string): void;
  removeAccessToken(): void;
}

@injectable()
export class StorageService implements IStorageService {
  private getItem<TData = any>(key: string): TData | undefined {
    let item = localStorage.getItem(key);

    if (item && !isJsonParsable(item)) {
      item = `"${item}"`;
    }

    return parseJson<TData>(item ?? '');
  }

  private setItem(key: string, data: any) {
    let stringified = data;

    if (typeof data !== 'string') {
      stringified = JSON.stringify(data);
    }

    localStorage.setItem(key, stringified);
  }

  private removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  getAccessToken() {
    return this.getItem(StorageKey.AccessToken);
  }

  setAccessToken(token: string) {
    this.setItem(StorageKey.AccessToken, token);
  }

  removeAccessToken() {
    this.removeItem(StorageKey.AccessToken);
  }
}
