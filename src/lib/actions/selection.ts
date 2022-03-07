import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { selectedItemIdState } from '../state/selection';

interface UseSelection {
  select(id: string): void;
  clear(): void;
}

export function useSelection(): UseSelection {
  return {
    select: useSetRecoilState(selectedItemIdState),
    clear: useResetRecoilState(selectedItemIdState),
  };
}
