export const parseJson = <TData>(str: string): TData | undefined => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return undefined;
  }
};

export const isJsonParsable = (s: string | null) => {
  try {
    JSON.parse(s || '');
  } catch {
    return false;
  }

  return true;
};
