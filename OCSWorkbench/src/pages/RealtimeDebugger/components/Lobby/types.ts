export interface InspectResult {
  type: string;
}

export interface InspectDictionary extends InspectResult {
  total: number;
  value: object;
}
