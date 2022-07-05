export interface Joke {
  error: boolean;
  category: string;
  type: string;
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: JokeFlags;
  id: number;
  safe: boolean;
  lang: string;
}

export interface JokeFlags {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
}

export interface Currency {
  label: string;
  value: string;
}

export interface CurrencyRate {
  status: string;
  updated_date: string;
  base_currency_code: string;
  amount: number;
  base_currency_name: string;
  rates: Rates;
}

interface Rates {
  [currencyCode: string]: RateData;
}

export interface RateData {
  currency_name: string;
  rate: string;
  rate_for_amount: string;
}
