import {
  green,
  red,
  yellow,
} from "https://deno.land/std@0.128.0/fmt/colors.ts";

type Status = "info" | "warning" | "fail";
const logMessage = "[SCRAPE] ";

export default (message: string, status: Status = "info") => {
  switch (status) {
    case "info":
      console.log(green(logMessage + message));
      break;
    case "warning":
      console.log(yellow(logMessage + message));
      break;
    case "fail":
      console.log(red(logMessage + message));
  }
};
