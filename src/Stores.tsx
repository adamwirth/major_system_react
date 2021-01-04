type MajorSystemMappingsType = {
  readonly [key: number]: string[];
};

const MajorSystemMappings: MajorSystemMappingsType = {
  0: ['S'],
  1: ['T', 'D'],
  2: ['N'],
  3: ['M'],
  4: ['R'],
  5: ['L'],
  6: ['Sh', 'Ch'],
  7: ['K', 'G'],
  8: ['F', 'V'],
  9: ['P', 'B'],
};

export default MajorSystemMappings;
