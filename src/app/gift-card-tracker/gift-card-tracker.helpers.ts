import { GiftCard } from './gift-card-tracker.beans';

export const createGiftCard = (): GiftCard => {
  return {
    storeName: '',
    amount: undefined,
    last4: ''
  };
}
