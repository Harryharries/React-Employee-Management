import { act, screen, waitFor} from "@testing-library/react"

import { renderWithContext } from "../../../test-utils"
import { EmployeeManagement } from "./absencesManagement";
import * as api from "../../api/api";
import mockMembers from "../../api/json_files/members.json";
import mockAbsences from "../../api/json_files/absences.json";
const getMembersSpy = jest.spyOn(api, "getMembers");
getMembersSpy.mockResolvedValue(mockMembers);
const getAbsencesSpy = jest.spyOn(api, "getAbsences");
getAbsencesSpy.mockResolvedValue(mockAbsences);

test("should contain Table", async ()=> {
  // render with trigger the dispatch action for fetching data so we need to use act() at here
  // eslint-disable-next-line testing-library/no-unnecessary-act
  // await act( async () => renderWithContext(<EmployeeManagement />));

  renderWithContext(<EmployeeManagement />)
  await waitFor(() => {
    expect(getAbsencesSpy).toHaveBeenCalledTimes(1)
  });
  expect(screen.getByRole("table")).toBeInTheDocument();
})