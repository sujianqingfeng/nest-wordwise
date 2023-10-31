export function createDto<T>() {
  class EmptyDto {} 
  return EmptyDto as { new(): T } 
}