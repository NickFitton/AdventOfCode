import {
  Command,
  number,
  string,
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
  .required(number, "year")
  .required(number, "day")
  .required(number, "part")
  .optional(string, "token", {
    flags: ["t", "token"],
    description:
      "An AoC session token, setting this will get problem statement from remote instead of local.",
  })
  .flag("submit", {
    aliases: ["s"],
    description: "If passed, I'll submit the result to AoC",
  });

const { year, day, part, source, token, submit } = cmd.run();

const solution = await import(`./${year}/${day}/main.ts`);

let text: string | undefined;
if (token) {
  text = await getRemoteProblemText(year, day, token);
} else {
  text = await getLocalProblemText(year, day);
}

const methodName = `part${part}`;
if (solution[methodName] === undefined) {
  throw new Error(
    `No solution has been written for ${year} ${day} ${methodName}`,
  );
}
const output = solution[`part${part}`](text);

console.log(
  `Your solution for ${year}/${day} part ${part} is:\n|\n|\t${output}`,
);

if (submit && !(source === "local")) {
  // TODO: Send solution up to AoC
  throw new Error("Submission not implemented");
}
