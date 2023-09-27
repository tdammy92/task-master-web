import {
  formatDistance,
  formatRelative,
  format,
  formatDistanceToNow,
  subDays,
  differenceInSeconds,
  isToday,
  isYesterday,
  differenceInDays,
  differenceInYears,
} from "date-fns";

export const formatMessageDateTime = (time: Date) => {
  const now = new Date();
  switch (true) {
    // case differenceInSeconds(now, time) < 60:
    //   return "a few seconds ago";
    case isToday(time):
      return format(time, "hh:mm a");
    case isYesterday(time):
      return `Yesterday, ${format(time, "hh:mm a")}`;
    case differenceInDays(now, time) < 7:
      return format(time, "eee, hh:mm a ");
    case differenceInYears(now, time) === 0:
      return format(time, "dd MMM hh:mm a");
    default:
      return format(time, "dd MMM yyyy hh:mm a");
  }
};
