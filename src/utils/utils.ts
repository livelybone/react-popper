import { PopperProps } from 'react-popper'

export function containsOrEqual<T extends PopperProps['referenceElement']>(
  parent: T,
  target?: HTMLElement,
) {
  if (!target || !(parent instanceof HTMLElement)) return false
  return parent && (parent === target || parent.contains(target))
}

export function getReferenceEl<T extends PopperProps['referenceElement']>(
  popperRef?: HTMLElement,
  referenceRef?: T,
) {
  return referenceRef || (popperRef && popperRef.parentElement) || undefined
}
