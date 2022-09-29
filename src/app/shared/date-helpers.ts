import * as dateFns from 'date-fns';

export const isSameDayOrBefore = (date1: Date, date2: Date): boolean => {
  const copyDate2 = new Date(date2);
  return dateFns.isSameDay(date1, date2) ||
    dateFns.isBefore(date1, dateFns.set(copyDate2, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }));
};

export const isSameDayOrAfter = (date1: Date, date2: Date): boolean => {
  const copyDate2 = new Date(date2);
  return dateFns.isSameDay(date1, date2) ||
    dateFns.isAfter(date1, dateFns.set(copyDate2, { hours: 11, minutes: 59, seconds: 59, milliseconds: 999 }));
};

export const isBeforeDate = (date1: Date, date2: Date) => {
  const copyDate1 = dateFns.set(new Date(date1), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  const copyDate2 = dateFns.set(new Date(date2), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  const dateDiff = dateFns.differenceInDays(copyDate1, copyDate2);
  return dateDiff < 0;
};

export const isAfterDate = (date1: Date, date2: Date) => {
  const copyDate1 = dateFns.set(new Date(date1), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  const copyDate2 = dateFns.set(new Date(date2), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  const dateDiff = dateFns.differenceInDays(copyDate1, copyDate2);
  return dateDiff > 0;
};

export const toLocalISOString = (date: Date): string => {
  if (!date) {
    return undefined;
  }
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
};
