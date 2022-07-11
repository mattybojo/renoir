export interface JokeSettings {
  categories: string;
  whitelist: string;
}

export class JokeCategoriesSettings {
  anyJoke = true;
  programming = false;
  misc = false;
  dark = false;
  pun = false;
  spooky = false;
  christmas = false;

  constructor() { }
}

export class JokeWhitelistSettings {
  nsfw = false;
  religious = false;
  political = false;
  racist = false;
  sexist = false;
  explicit = false;

  constructor() { }
}
