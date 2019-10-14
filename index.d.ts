import PopperJs from 'popper.js'
import { Component, ReactNode } from 'react'
import { PopperProps } from 'react-popper'

declare enum TriggerType {
  click = 0,
  hover = 1,
}

interface ReactPopperProps {
  /**
   * 强制显示 popper 组件
   *
   * Force to show the popper
   * */
  forceShow?: boolean
  /**
   * 关联 dom 元素用于控制 popper 是否显示的事件
   *
   * Determine what event of reference element will make the popper show or hide
   *
   * Default: TriggerType.click
   * */
  trigger?: TriggerType
  className?: string
  /**
   * Popper 的位置
   *
   * Placement of popper
   *
   * Default: 'bottom-start'
   * */
  placement?: PopperProps['placement']
  /**
   * 关联元素
   *
   * Reference element
   *
   * Default: The parent element of the component element
   * */
  referenceRef?: PopperProps['referenceElement']
  children?: ReactNode
  /**
   * Modifiers config of popperjs
   * See in https://popper.js.org/popper-documentation.html#Popper.Defaults.modifiers
   * */
  modifiers?: PopperProps['modifiers']
  /**
   * Default: true
   * */
  positionFixed?: PopperProps['positionFixed']
  /**
   * Arrow 箭头的问题
   *
   * Position of arrow
   *
   * Default: 'middle'
   * */
  arrowPosition?: 'start' | 'end' | 'middle'
  /**
   * Arrow 箭头的偏移量
   *
   * Position offset of arrow
   *
   * Default: 15
   * */
  arrowOffset?: number

  /**
   * popper 显示/隐藏之后触发的回调
   *
   * The callback triggered after popper's show/hide
   * */
  afterToggle?(visible: boolean): void
}

declare class ReactPopper extends Component<
  ReactPopperProps,
  {
    visible: boolean
    isMounted: boolean
  }
> {
  private popperRef?
  private arrowRef?

  constructor(props: ReactPopperProps)

  private readonly referenceEl
  private readonly isHover
  private readonly eventName
  private readonly modifiers
  /**
   * Show the popper
   *
   * Use it outside the component:
   *
   * <ReactPopper ref={compInstance => ref = compInstance}></ReactPopper>
   * ref.show()
   * */
  show: () => void
  /**
   * Hide the popper
   *
   * Use it outside the component: same as method show
   * */
  hide: () => void
  /**
   * Toggle the popper
   *
   * Use it outside the component: same as method show
   * */
  toggle: () => void

  componentDidMount(): void

  componentWillUnmount(): void

  render(): JSX.Element

  private eventHandler
  private readonly visible
  private afterToggle
}

declare function arrowModifier(
  arrowPosition: ReactPopperProps['arrowPosition'],
  arrowOffset: ReactPopperProps['arrowOffset'],
  ...[dataObject, options]: Parameters<
    NonNullable<NonNullable<PopperJs.Modifiers['arrow']>['fn']>
  >
): PopperJs.Data

declare function convertPos(
  data: PopperJs.Data,
  type: 'left' | 'top',
  arrowPosition?: ReactPopperProps['arrowPosition'],
  arrowOffset?: ReactPopperProps['arrowOffset'],
): number

declare function containsOrEqual<T extends PopperProps['referenceElement']>(
  parent: T,
  target?: HTMLElement,
): boolean

declare function getReferenceEl<T extends PopperProps['referenceElement']>(
  popperRef?: HTMLElement,
  referenceRef?: T,
): HTMLElement | T | undefined

export default ReactPopper
export {
  ReactPopperProps,
  TriggerType,
  arrowModifier,
  containsOrEqual,
  convertPos,
  getReferenceEl,
}
