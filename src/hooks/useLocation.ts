import { useLocation as useRRDLocation } from 'react-router-dom';

import { UseLocationReturn } from '../types/navigation';

const useLocation = (): UseLocationReturn => {
  return useRRDLocation() as UseLocationReturn;
};

export default useLocation;
