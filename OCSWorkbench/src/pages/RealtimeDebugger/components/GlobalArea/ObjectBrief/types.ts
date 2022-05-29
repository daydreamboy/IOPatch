import { InspectResult } from '@/pages/RealtimeDebugger/components/GlobalArea/types';

export interface InspectObject extends InspectResult {
  address: string;
  class: string;
  ui?: boolean;
  count?: number;
}

export type ObjectFrameInfo = {
  content: InspectObject;
  className: string;
  address: string;
};

export type PathElement = {
  title: string;
  info: ObjectFrameInfo;
};

export type OnPushFunction = (e: PathElement) => Promise<void>;

export type ObjectBriefProps = {
  content: InspectResult;
  onChange?: (newValue: any) => Promise<void>;
  onPush?: OnPushFunction;
  title?: string;
};
