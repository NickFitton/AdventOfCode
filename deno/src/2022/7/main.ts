class Directory {
  public subDirectories: Record<string, Directory>;
  private files: Record<string, number>;
  public filesSize: number;

  constructor() {
    this.subDirectories = {};
    this.files = {};
    this.filesSize = 0;
  }

  public addDir(name: string): void {
    this.subDirectories[name] = new Directory();
  }

  private getDir(name: string): Directory | undefined {
    return this.subDirectories[name];
  }

  public addFile(name: string, size: number): void {
    this.files[name] = size;
    this.filesSize += size;
  }

  public getOrCreateDir(name: string): Directory {
    let requestedDir = this.getDir(name);

    if (!requestedDir) {
      this.addDir(name);
      return this.getDir(name)!;
    }
    return requestedDir;
  }
}

const MAX_DIR_SIZE = 100_000;
const DISK_SPACE = 70_000_000;
const REQUIRED_SPACE = 30_000_000;

const composeDirectoriesFromText = (text: string): Directory => {
  const logQueue = text.split("\n");
  // Remove the initial `$ cd /` as we're passing that dir into the next function
  logQueue.shift();

  return parseDirUntilLeave(logQueue, new Directory());
};

/**
 * Parses the logs until the current directory is left (cd ..) or run out of logs. Then returning the current directory.
 */
const parseDirUntilLeave = (
  logs: string[],
  currentDir: Directory
): Directory => {
  let currentLog = logs.shift();
  while (logs.length > 0 || currentLog !== undefined) {
    if (currentLog === undefined) {
      continue;
    }
    if (currentLog.startsWith("dir ")) {
      currentDir.addDir(currentLog.split(" ")[1]);
    } else if (currentLog.match(/^\d/)) {
      const [sizeStr, name] = currentLog.split(" ");
      const size = parseInt(sizeStr);
      currentDir.addFile(name, size);
    } else if (currentLog === "$ cd ..") {
      return currentDir;
    } else if (currentLog.startsWith("$ cd ")) {
      const [_dollar, _command, dir] = currentLog.split(" ");
      parseDirUntilLeave(logs, currentDir.getOrCreateDir(dir));
    } else if (currentLog === "$ ls") {
      // Do nothing
    } else {
      console.log(`Couldn't parse line: ${currentLog}`);
    }
    currentLog = logs.shift();
  }

  return currentDir;
};

const getDirSizeAndRecordChildren = (
  directory: Directory,
  currentPath: string,
  sizeMap: Record<string, number>
): number => {
  let size = 0;

  Object.entries(directory.subDirectories).forEach(([name, subDirectory]) => {
    const path = `${currentPath}/${name}`;
    const subdirSize = getDirSizeAndRecordChildren(subDirectory, path, sizeMap);
    size += subdirSize;
    sizeMap[path] = subdirSize;
  });

  size += directory.filesSize;

  return size;
};

const getDirSizes = (directory: Directory): Record<string, number> => {
  const sizeMap: Record<string, number> = {};

  const rootSize = getDirSizeAndRecordChildren(directory, ``, sizeMap);
  sizeMap[`/`] = rootSize;

  return sizeMap;
};

const sumOfSmallerDirectories = (text: string): number => {
  const topDir = composeDirectoriesFromText(text);

  const dirSizes = getDirSizes(topDir);

  const undersizedDirs = Object.entries(dirSizes)
    .filter(([_name, size]) => size <= MAX_DIR_SIZE)
    .reduce(
      (agg, [name, size]) => ({ ...agg, [name]: size }),
      {} as Record<string, number>
    );
  return Object.values(undersizedDirs).reduce((a, b) => a + b);
};

export const part1 = sumOfSmallerDirectories;

const getSizeOfSmallestDeletableDir = (text: string): number => {
  const topDir = composeDirectoriesFromText(text);
  const dirSizes = getDirSizes(topDir);

  const freeDiskSpace = DISK_SPACE - dirSizes["/"];
  const maxSizeOfFile = REQUIRED_SPACE - freeDiskSpace;

  const sizes = Object.values(dirSizes);
  sizes.sort((a, b) => a - b);
  return sizes.find((size) => size > maxSizeOfFile)!;
};

export const part2 = getSizeOfSmallestDeletableDir;
