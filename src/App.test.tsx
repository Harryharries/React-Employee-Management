import App from "./MainApp"
import { act, render, screen} from "@testing-library/react"

import { Provider } from "react-redux"
import { store } from "app/store"

test("Testing jest is working", ()=>{
  expect(true).toBe(true)
})

test("should contain APP Title", async ()=> {
  // render with trigger the dispatch action for fetching data so we need to use act() at here
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act( async () => renderWithContext(<App />));
  
  expect(screen.getByText(/Absences Management/i)).toBeInTheDocument();
})

function renderWithContext(element: React.ReactElement){
  render(<Provider store={store}>{element}</Provider>)
}