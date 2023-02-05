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
  // TODO: Research for a better way to resolve the testing warning without using eslint-disable-next-line
  // render with trigger the dispatch action for fetching data so we need to use act() at here
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act( async () => renderWithContext(<EmployeeManagement />));

  expect(getAbsencesSpy).toHaveBeenCalledTimes(1)
  expect(getMembersSpy).toHaveBeenCalledTimes(1)
  expect(screen.getByRole("table")).toBeInTheDocument();
})