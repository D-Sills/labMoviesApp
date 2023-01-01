import truncate from "lodash/truncate";

export function excerpt(string) {
  return truncate(string, {    
    length: 250, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}