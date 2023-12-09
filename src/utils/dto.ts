export function createDtoByType<T>() {
  class EmptyDto {}
  return EmptyDto as { new (): T }
}
