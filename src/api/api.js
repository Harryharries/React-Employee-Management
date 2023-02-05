import membersJson from './json_files/members.json';
import absencesJson from './json_files/absences.json';

export const members = new Promise((resolve) => {resolve(membersJson)});
export const absences = new Promise((resolve) => {resolve(absencesJson)});

export async function getMembers() {
    const results = await new Promise((resolve) => {resolve(membersJson)})
    return results;
}

export async function getAbsences() {
    const results = await new Promise((resolve) => {resolve(absencesJson)})
    return results;
}