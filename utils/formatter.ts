import moment from "moment";

export function formatDate(date?: Date | string | number): string | undefined {
  if (date) {
    return moment(String(date)).format("DD/MM/YYYY HH:mm:ss");
  }
  return undefined;
}
