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

  getSettings(): string {
    let str = '';
    if (this.AnyJoke) {
      str += 'Any,';
    }
    if (this.Programming) {
      str += 'Programming,';
    }
    if (this.Misc) {
      str += 'Misc,';
    }
    if (this.Dark) {
      str += 'Dark,';
    }
    if (this.Pun) {
      str += 'Pun,';
    }
    if (this.Spooky) {
      str += 'Spooky,';
    }
    if (this.Christmas) {
      str += 'Christmas,';
    }
    return str.slice(0, str.length - 1);
  }
}

export class JokeBlacklistSettings {
  nsfw = true;
  religious = true;
  political = true;
  racist = true;
  sexist = true;
  explicit = true;

  constructor() { }

  getOptions(): string {
    return 'nsfw,religious,political,racist,sexist,explicit';
  }

  getSettings(): string {
    let str = '';
    if (this.nsfw) {
      str += 'nsfw,';
    }
    if (this.religious) {
      str += 'religious,';
    }
    if (this.political) {
      str += 'political,';
    }
    if (this.racist) {
      str += 'racist,';
    }
    if (this.sexist) {
      str += 'sexist,';
    }
    if (this.explicit) {
      str += 'explicit,';
    }
    return str.slice(0, str.length - 1);
  }
}
