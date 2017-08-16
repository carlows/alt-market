// @flow

import { required, email, minLength } from '../validations';

describe('validations', () => {
  describe('required', () => {
    it('should not pass with empty string', () => {
      expect(required('')).toBeFalsy();
    });

    it('should pass with string with length 1 or bigger', () => {
      expect(required('a')).toBeTruthy();
      expect(required('Some Long String')).toBeTruthy();
    });
  });

  describe('email', () => {
    it('should not pass with invalid email', () => {
      expect(email('asd')).toBeFalsy();
    });

    it('should pass with valid email', () => {
      expect(email('john@doe.com')).toBeTruthy();
    });
  });

  describe('minLength', () => {
    const minLengthValidator = minLength(8);

    it('should not pass with a length smaller than the required length', () => {
      expect(minLengthValidator('123')).toBeFalsy();
      expect(minLengthValidator('1234567')).toBeFalsy();
    });

    it('should pass with string that has the min required length or bigger', () => {
      expect(minLengthValidator('12345678')).toBeTruthy();
      expect(minLengthValidator('123456789abcdef')).toBeTruthy();
    });
  });
});
