import { PopperProps } from 'react-popper'

export function containsOrEqual<T extends PopperProps['referenceElement']>(
  parent: T,
  target?: HTMLElement,
) {
  if (!target || !(parent instanceof HTMLElement)) return false
  return parent && parent.contains(target)
}

export function getReferenceEl<T extends PopperProps['referenceElement']>(
  popperRef?: HTMLElement,
  referenceRef?: T | (() => T),
) {
  const ref = typeof referenceRef === 'function' ? referenceRef() : referenceRef
  return ref || (popperRef && popperRef.parentElement) || undefined
}
