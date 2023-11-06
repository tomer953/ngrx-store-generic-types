import { createAction, props } from '@ngrx/store';
import { PcDataKey, PcDataType, RequestStatus } from './state.interface';

export const setUsername = createAction(
  '[Main] setUsername',
  props<{ username: string }>()
);
export const setPcStatus = createAction(
  '[Main] setPcStatus',
  props<{ key: PcDataKey; status: RequestStatus }>()
);

// props does not support for generic types, so I used the arrow function method:
const pcDataProps = <K extends PcDataKey>(obj: {
  key: K;
  data: PcDataType<K>;
}) => obj;
export const setPcData = createAction('[Main] setPcData', pcDataProps);

// now, while this throws as it should (type safety for the data type based on the key):
pcDataProps({ key: 'Drives', data: { response: 100 } });
// this doesn't, so the createAction is somewhere ignore the generic types:
setPcData({ key: 'Drives', data: { response: 100 } }); // Should throw Type '{ response: number; }' is not assignable to type 'DrivesResult'
