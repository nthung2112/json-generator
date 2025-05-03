export interface UseableInfo {
  key: string;
  group: string;
  usage: string;
  explanation: string;
  example?: string;
}

export interface GroupedUseables {
  [groupKey: string]: {
    [key: string]: {
      group: string;
      usage: string;
      explanation: string;
      example?: string;
    };
  };
}
