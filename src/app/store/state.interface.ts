export interface State {
  username: string;
  pcData: PcData;
}

// items "enum"
const PcDataItem = {
  Ping: 'Ping',
  Drives: 'Drives',
  Printers: 'Printers',
} as const;

export type RequestStatus = 'Loading' | 'Completed' | 'error';
type Result<T> = {
  status: RequestStatus;
  data: T;
  errorMsg: string;
};

// each item has different result
type PingResult = { response: number };
type DrivesResult = { space: number; freeSpace: number }[];
type PrintersResult = { driver: string }[];

// map each item to its result
export type PcDataItemType = {
  [PcDataItem.Ping]: PingResult;
  [PcDataItem.Drives]: DrivesResult;
  [PcDataItem.Printers]: PrintersResult;
};
// utility types
export type PcDataKey = keyof typeof PcDataItem;
export type PcDataType<K extends PcDataKey> = PcData[K]['data'];
export type PcData = {
  [K in PcDataKey]: Result<PcDataItemType[(typeof PcDataItem)[K]]>;
};
