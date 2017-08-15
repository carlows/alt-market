// @flow

// Redux specific types
export type Action = { type: string, payload: any };
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;

export type GraphQLMock = {
  request: {
    variables: Object,
    query: Object
  },
  result?: {
    data: Object
  },
  error?: Object,
  delay?: number
};

export type Args = Array<any>;
