export interface InspectResult {
  type: string;
}

export interface InspectDictionary extends InspectResult {
  total: number;
  value: object;
}

export interface InspectRawValue extends InspectResult {
  value: any;
}

export interface GlobalAreaRowItem {
  key: string;
  value: InspectResult;
}
