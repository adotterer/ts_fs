import { JSXElementConstructor } from 'react';

const SHOW: string = 'modal/SHOW';
const HIDE: string = 'modal/HIDE';
const CURRENT: string = 'modal/CURRENT';

export type modalState = {
  display: boolean,
  Current: JSXElementConstructor<any>,
};

type modalAction = {
  Current?: JSXElementConstructor<any>,
  type: string;
};

export const ShowModal = (): modalAction => ({
  type: SHOW
});

export const HideModal = (): modalAction => ({
  type: HIDE
});

export const SetModalCurrent = (Current: JSXElementConstructor<any>): modalAction => ({
  type: CURRENT,
  Current
});

export default function reducer(
  state: modalState = { display: false, Current: null },
  { type, Current }: modalAction
): modalState {
  switch (type) {
    case SHOW:
      return {
        ...state,
        display: true
      };
    case HIDE:
      return {
        ...state,
        display: false
      };
    case CURRENT:
      return {
        ...state,
        Current
      };
    default:
      return state;
  }
}
