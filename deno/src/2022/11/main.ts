import { decreasing } from "../../utils/sort.ts";

const MONKEY_REGEX =
  /Monkey (?<id>\d+):\n {2}Starting items: (?<first>\d+)(?<rest>(, \d+)*)\n {2}Operation: new = (?<operation>[a-z 0-9*+]+)\n {2}Test: divisible by (?<divider>\d+)\n {4}If true: throw to monkey (?<trueMonkey>\d+)\n {4}If false: throw to monkey (?<falseMonkey>\d+)/;
const WORRY_MULTIPLIER = /old \* (?<by>\d+)/;
const WORRY_ADDER = /old \+ (?<by>\d+)/;

type MonkeyRegexGroup = {
  id: string;
  first: string;
  rest: string;
  operation: string;
  divider: string;
  trueMonkey: string;
  falseMonkey: string;
};

class Monkey {
  public inspections = 0;
  constructor(
    public id: number,
    public items: number[],
    public inspect: (oldWorryLevel: number) => number,
    public inspectType: "multi" | "incre" | "square",
    public factor: number,
    public trueMonkey: number,
    public falseMonkey: number
  ) {}

  public inspectFirstItem(): void {
    this.inspections++;
    this.items[0] = Math.floor(this.inspect(this.items[0]) / 3);
  }

  public inspectFirstItemCarefully(superModulo: number): void {
    this.inspections++;
    this.items[0] = this.inspect(this.items[0]) % superModulo;
  }

  public decideTarget(): number {
    if (this.items[0] % this.factor === 0) {
      return this.trueMonkey;
    } else {
      return this.falseMonkey;
    }
  }
}

const regexGroupToMonkey = (group: MonkeyRegexGroup): Monkey => {
  let inspect = (oldWorryLevel: number) => oldWorryLevel * oldWorryLevel;
  let inspectType: "multi" | "incre" | "square" = "square";

  const operation = group.operation;

  const multiMatch = WORRY_MULTIPLIER.exec(operation);
  if (multiMatch) {
    const multiplier = parseInt(multiMatch.groups!.by);
    inspect = (oldWorryLevel: number) => {
      return oldWorryLevel * multiplier;
    };
    inspectType = "multi";
  }

  const adderMatch = WORRY_ADDER.exec(operation);
  if (adderMatch) {
    const increment = parseInt(adderMatch.groups!.by);
    inspect = (oldWorryLevel: number) => {
      return oldWorryLevel + increment;
    };
    inspectType = "incre";
  }

  return new Monkey(
    parseInt(group.id),
    (group.first + group.rest).split(", ").map((item) => parseInt(item)),
    inspect,
    inspectType,
    parseInt(group.divider),
    parseInt(group.trueMonkey),
    parseInt(group.falseMonkey)
  );
};

const loadMonkeys = (text: string): Monkey[] => {
  let match = MONKEY_REGEX.exec(text);
  const groups: MonkeyRegexGroup[] = [];
  while (match) {
    const originalString = match[0];
    const group = match.groups! as MonkeyRegexGroup;
    groups.push(group);
    text = text.replace(originalString, "").trim();
    match = MONKEY_REGEX.exec(text);
  }

  return groups.map((group) => regexGroupToMonkey(group));
};

const throwItemToMonkey = (fromMonkey: Monkey, toMonkey: Monkey): void => {
  const item = fromMonkey.items.shift()!;

  toMonkey.items.push(item);
};

export const part1 = (text: string): number => {
  const monkeys = loadMonkeys(text);

  for (let round = 0; round < 20; round++) {
    monkeys.forEach((monkey) => {
      while (monkey.items.length > 0) {
        monkey.inspectFirstItem();
        const target = monkey.decideTarget();
        throwItemToMonkey(monkey, monkeys[target]);
      }
    });
  }

  const inspections = monkeys.map((monkey) => monkey.inspections);
  inspections.sort(decreasing);

  return inspections.slice(0, 2).reduce((a, b) => a * b);
};

export const part2 = (text: string): number => {
  const monkeys = loadMonkeys(text);
  const superModulo = monkeys.reduce((a, b) => a * b.factor, 1);

  for (let round = 1; round <= 10_000; round++) {
    monkeys.forEach((monkey) => {
      while (monkey.items.length > 0) {
        monkey.inspectFirstItemCarefully(superModulo);
        const target = monkey.decideTarget();
        throwItemToMonkey(monkey, monkeys[target]);
      }
    });
  }

  const inspections = monkeys.map((monkey) => monkey.inspections);
  inspections.sort(decreasing);

  return inspections.slice(0, 2).reduce((a, b) => a * b);
};
