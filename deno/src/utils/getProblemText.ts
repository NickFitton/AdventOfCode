export const getLocalProblemText = (
  year: number,
  day: number
): Promise<string> => Deno.readTextFile(`./src/${year}/${day}/input.txt`);

export const getRemoteProblemText = async (
  year: number,
  day: number,
  sessionCookie: string
): Promise<string> => {
  const response = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    { headers: { cookie: `session=${sessionCookie}` } }
  );

  const problemText = await response.text();
  return problemText.trim();
};
