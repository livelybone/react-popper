import PopperJs from 'popper.js'
import { ReactPopperProps } from './type'

export function arrowModifier(
  arrowPosition: ReactPopperProps['arrowPosition'],
  arrowOffset: ReactPopperProps['arrowOffset'],
  ...[dataObject, options]: Parameters<
    NonNullable<NonNullable<PopperJs.Modifiers['arrow']>['fn']>
  >
) {
  // @ts-ignore
  const data = PopperJs.Defaults.modifiers.arrow.fn(dataObject, options)

  const posTypeNeedSet = /^(bottom|top)/.test(data.placement) ? 'left' : 'top'
  data.offsets.arrow[posTypeNeedSet] = convertPos(
    data,
    posTypeNeedSet,
    arrowPosition,
    arrowOffset,
  )

  return data
}

export function convertPos(
  data: PopperJs.Data,
  type: 'left' | 'top',
  arrowPosition: ReactPopperProps['arrowPosition'] = 'middle',
  arrowOffset: ReactPopperProps['arrowOffset'] = 15,
) {
  const {
    offsets: {
      arrow: { left, top },
      reference,
      popper,
    },
    arrowElement,
  } = data
  const pos = type === 'left' ? left : top

  let pos1 = 0

  const altSide = type === 'left' ? 'left' : 'top'
  const len = type === 'left' ? 'width' : 'height'
  const offsetSize = type === 'left' ? 'offsetWidth' : 'offsetHeight'
  const clientSize = type === 'left' ? 'clientWidth' : 'clientHeight'
  const size =
    (arrowElement as HTMLElement)[offsetSize] ||
    (arrowElement as HTMLElement)[clientSize]

  if (arrowPosition === 'start') {
    pos1 = arrowOffset + Math.max(0, -(popper[altSide] - reference[altSide]))
  } else if (arrowPosition === 'end') {
    pos1 =
      Math.min(reference[len], popper[len]) -
      Math.min(0, popper[altSide] - reference[altSide]) -
      arrowOffset -
      size
  } else if (pos < arrowOffset) {
    pos1 = arrowOffset
  } else if (pos > popper[len] - size - arrowOffset) {
    pos1 = popper[len] - size - arrowOffset
  } else {
    pos1 = pos
  }
  return pos1
}
