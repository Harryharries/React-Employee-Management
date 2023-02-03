import { act, render, screen} from "@testing-library/react"

import { Provider } from "react-redux"
import { store } from "app/store"
import { EmployeeManagement } from "./absencesManagement";

test("should contain Table", async ()=> {
  // render with trigger the dispatch action for fetching data so we need to use act() at here
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act( async () => renderWithContext(<EmployeeManagement />));
  
  expect(screen.getByRole("table")).toBeInTheDocument();
})

function renderWithContext(element: React.ReactElement){
  render(<Provider store={store}>{element}</Provider>)
}