export interface JokeSettings {
  categories: string;
  blacklist: string;
}

export class JokeCategoriesSettings {
  AnyJoke = false;
  Programming = false;
  Misc = true;
  Dark = false;
  Pun = false;
  Spooky = false;
  Christmas = false;

  constructor() { }
}

export class JokeBlacklistSettings {
  nsfw = true;
  religious = true;
  political = true;
  racist = true;
  sexist = true;
  explicit = true;

  constructor() { }
}
