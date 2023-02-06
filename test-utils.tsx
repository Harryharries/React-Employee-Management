import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";
import { RootState, getStoreWithState } from "./src/app/store";
import { Absence } from "shared/model/absence";
import { Member } from "shared/model/member";

export function renderWithContext(
  element: React.ReactElement,
  state?: RootState
) {
  const store = getStoreWithState(state);
  const utils = render(
    <Provider store={store}>{element}</Provider>
  );
  return { store, ...utils };
}

export function getStateWithItems(
  absences: Absence[],
  members: Member[] = [],
  loading: boolean = false
): RootState {
  const state: RootState = {
    employees: {
      absences,
      members,
      loading
    }
  };
  return state;
}
