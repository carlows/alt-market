// @flow

import { createThunk } from '../helpers';

describe('helpers', () => {
  describe('createThunk', () => {
    let mockCallback = jest.fn();
    let mockDispatch = jest.fn();
    const payload = { something: true };
    const type = 'TEST_ACTION';
    const asyncAction = createThunk(type, mockCallback)(payload);

    beforeEach(() => {
      mockCallback.mockReset();
      mockDispatch.mockReset();
    });

    it(`should dispatch an action of type ${type}_STARTED`, () => {
      return asyncAction(mockDispatch).then(() => {
        expect(mockDispatch).toBeCalledWith({
          type: `${type}_STARTED`,
          payload
        });
      });
    });

    it(`should dispatch an action of type ${type}_ENDED`, () => {
      return asyncAction(mockDispatch).then(() => {
        expect(mockDispatch).toBeCalledWith({
          type: `${type}_ENDED`,
          payload
        });
      });
    });

    it(`should dispatch an action of type ${type}_SUCCESS when callback has no errors`, () => {
      const response = { data: { some: 'fake data' } };
      mockCallback.mockReturnValue(response);

      return asyncAction(mockDispatch).then(() => {
        expect(mockCallback).toBeCalled();
        expect(mockDispatch).toBeCalledWith({
          type: `${type}_SUCCESS`,
          payload: response.data
        });
      });
    });

    it(`should dispatch an action of type ${type}_ERROR when callback has throws any error`, () => {
      mockCallback.mockImplementation(() => {
        throw 'some error';
      });

      return asyncAction(mockDispatch).then(() => {
        expect(mockCallback).toBeCalled();
        expect(mockDispatch).toBeCalledWith({
          type: `${type}_ERROR`,
          payload: 'some error'
        });
      });
    });

    it(`should call dispatch exactly 3 times`, () => {
      return asyncAction(mockDispatch).then(() => {
        expect(mockDispatch.mock.calls.length).toEqual(3);
      });
    });
  });
});
