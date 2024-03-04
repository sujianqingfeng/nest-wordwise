export function createSafePromise<R = any, T extends any[] = any[]>(
  promiseFn: (...rest: T) => Promise<R>,
) {
  if (typeof promiseFn !== "function") {
    throw new Error("createSafePromise: promiseFn must be a function");
  }
  return async (
    ...rest: Parameters<typeof promiseFn>
  ): Promise<[true, R] | [false, any]> => {
    try {
      const data = await promiseFn(...rest);
      return [true, data];
    } catch (error) {
      return [false, error];
    }
  };
}

export function getProxy() {
  const isDev = process.env.NODE_ENV === "development";
  return isDev
    ? {
        protocol: "http",
        host: "127.0.0.1",
        port: 7890,
      }
    : null;
}
