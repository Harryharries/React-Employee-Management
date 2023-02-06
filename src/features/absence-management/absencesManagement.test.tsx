import { act, screen, waitFor} from "@testing-library/react"

import { getStateWithItems, renderWithContext } from "../../../test-utils"
import { EmployeeManagement } from "./absencesManagement";
import * as api from "../../api/api";
import mockMembers from "../../api/json_files/members.json";
import mockAbsences from "../../api/json_files/absences.json";
import absences from "../../../public/absencesTest.json"
import members from "../../../public/membersTest.json"
import { Absence } from "shared/model/absence";

const getMembersSpy = jest.spyOn(api, "getMembers");
getMembersSpy.mockResolvedValue(mockMembers);
const getAbsencesSpy = jest.spyOn(api, "getAbsences");
getAbsencesSpy.mockResolvedValue(mockAbsences);

test("should contain Table with Data", async ()=> {
  // TODO: Research for a better way to resolve the testing 
  //       warning without using eslint-disable-next-line
  //       this warning is from react dom 18 + Jest
  // render with trigger the dispatch action for fetching data so we need to use act() at here
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act( async () => renderWithContext(<EmployeeManagement />));

  expect(getAbsencesSpy).toHaveBeenCalledTimes(1)
  expect(getMembersSpy).toHaveBeenCalledTimes(1)

  expect(screen.getByRole("table")).toBeInTheDocument();
})

test("Table should contain filter row and header row", async ()=> {
  const state = getStateWithItems([]);
  renderWithContext(<EmployeeManagement />, state);
  const rows = await waitFor(() => screen.findAllByRole("row"));
  expect(screen.getByRole("table")).toBeInTheDocument();
  const headerRows = 2
  expect(rows.length).toEqual(headerRows);
})

test("Table should show empty state if there are no results", async ()=> {
  const state = getStateWithItems([]);
  renderWithContext(<EmployeeManagement />, state);
  const noResultsText = await waitFor(() => screen.findByText(/Showing 0 to 0 of 0 entries/i)); 
  expect(noResultsText).toBeInTheDocument();
})

test("Table should show only 10 records evenif there is more than 10 record at the beginning", async ()=> {
  const mockAbsencesData : [] | any = absences
  const mockMembersData : Absence[] | any = members
  const state = getStateWithItems(mockAbsencesData, mockMembersData);
  renderWithContext(<EmployeeManagement />, state);
  const rows = await waitFor(() => screen.findAllByRole("row"));
  const headerRows = 2
  expect(rows.length).toEqual(absences.length > 10 + headerRows? 12: absences.length + headerRows);
})