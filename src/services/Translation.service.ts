import LocalizedStrings from 'react-localization';
import { injectable } from 'tsyringe';

import en from '../languages/en.json';

import { Language, Strings } from './types';

const languages = {
  [Language.En]: en,
};

export interface ITranslationService {
  strings: Strings;
}

@injectable()
export class TranslationService implements ITranslationService {
  private _strings: Strings = new LocalizedStrings(languages);

  public get strings(): Strings {
    return this._strings;
  }
}
