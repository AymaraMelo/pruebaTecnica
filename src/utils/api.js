export function parseParams(object) {
  const result = Object.entries(object).reduce((accum, current) => {
    const accumulator = accum;
    if (current[1]) {
      accum.push(`${current[0]}=${current[1]}`);
    }
    return accumulator;
  }, []);
  return result.join('&');
}
