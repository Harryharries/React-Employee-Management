import membersJson from './json_files/members.json';
import absencesJson from './json_files/absences.json';

export const members = new Promise((resolve) => {resolve(membersJson)});
export const absences = new Promise((resolve) => {resolve(absencesJson)});

