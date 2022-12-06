/**
 * Finds the first place in a line of text where a chunk of the given size is unique.
 * Returns -1 if no chunk is found.
 */
const findFirstUniqueChunk = (text: string, chunkSize: number): number => {
  const queue = text.split("");
  let buffer = queue.splice(0, chunkSize);
  let pointer = chunkSize;

  while (queue.length > 0) {
    if (new Set(buffer).size === chunkSize) {
      return pointer;
    }

    pointer++;
    buffer = [...buffer.slice(1), queue.shift()!];
  }
  return -1;
};

const findStartOfPacket = (text: string): number => {
  return findFirstUniqueChunk(text, 4);
};

export const part1 = findStartOfPacket;

const findStartOfMessage = (text: string): number => {
  return findFirstUniqueChunk(text, 14);
};

export const part2 = findStartOfMessage;
