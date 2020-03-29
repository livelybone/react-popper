import { PopperProps } from 'react-popper'

export function containsOrEqual(
  parent: PopperProps['referenceElement'],
  target?: HTMLElement,
) {
  if (!target || !(parent instanceof HTMLElement)) return false
  return parent && parent.contains(target)
}

export function getReferenceEl(
  popperRef?: HTMLElement,
  referenceRef?:
    | PopperProps['referenceElement']
    | (() => PopperProps['referenceElement']),
): PopperProps['referenceElement'] {
  const ref = typeof referenceRef === 'function' ? referenceRef() : referenceRef
  return ref || (popperRef && popperRef.parentElement) || undefined
}
