import { Location } from 'history';

export interface LocationState {
  from: Location;
  background: Location;
}

export interface UseLocationReturn extends Location {
  state: LocationState | undefined;
}
