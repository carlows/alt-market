// @flow

export const required = (val: mixed) => !!val;

export const email = (value: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

export const minLength = (min: number) => (value: string) =>
  value && value.length >= min;
