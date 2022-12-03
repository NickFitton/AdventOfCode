import {
  Command,
  number,
  choice,
  string,
  boolean,
} from "https://deno.land/x/clay@v0.2.5/mod.ts";
import {
  getLocalProblemText,
  getRemoteProblemText,
} from "./utils/getProblemText.ts";

interface Arguments {
  year: number;
  day: number;
  part: number;
  source: "local" | "remote" | null;
  token: string;
  submit: boolean;
}

// Deno.writeTextFile("./hello.txt", "this is where I am");

const cmd = new Command<Arguments>("Your favorite AoC runner")
  .required(number, "year", {
    flags: ["y", "year"],
    description: "The year of the AoC problem",
  })
  .required(number, "day", {
    flags: ["d", "day"],
    description: "The day of the AoC problem",
  })
  .required(number, "part", {
    flags: ["p", "part"],
    description: "The part of the days AoC problem",
  })
  .optional(choice("SOURCE", ["local", "remote"]), "source", {
    flags: ["s", "source"],
    description:
      "Where to get the input data from. Local attempts to load a `input.txt` in the problems folder, remote attempts to fetch from AoC",
  })
  .optional(string, "token", {
    flags: ["t", "token"],
    description:
      'An AoC session token, this is required if "source" is "remote".',
  })
  .optional(boolean, "submit", {
    flags: ["submit"],
    description: "If passed, I'll submit the result to AoC",
  });

const { year, day, part, source, token, submit } = cmd.run();

const solution = await import(`./${year}/${day}/main.ts`);

let text: string | undefined;
if (source === "remote") {
  if (!token) {
    throw new Error(
      'Source was set to "remote" but no token was provided, pass a token using -t or --token'
    );
  }
  text = await getRemoteProblemText(year, day, token);
} else {
  text = await getLocalProblemText(year, day);
}

const methodName = `part${part}`;
if (solution[methodName] === undefined) {
  throw new Error(
    `No solution has been written for ${year} ${day} ${methodName}`
  );
}
const output = solution[`part${part}`](text);

console.log(`Your solution for ${year}/${day} part ${part} is:\n|\t${output}`);

if (submit) {
  // TODO: Send solution up to AoC
}
