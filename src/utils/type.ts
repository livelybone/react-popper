import { MouseEvent, ReactNode } from 'react'
import { PopperChildrenProps, PopperProps } from 'react-popper'
import ReactPopper from '../index'

export enum TriggerType {
  click,
  hover,
}

export interface ReactPopperProps {
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
  /**
   * 延迟显示
   *
   * Delay to show
   *
   * Default: 0
   * */
  delayShow?: number
  /**
   * 延迟隐藏
   *
   * Delay to hide
   *
   * Default:
   *  If trigger === TriggerType.hover, default is 200
   *  Else default is 0
   * */
  delayHide?: number
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
  referenceRef?:
    | PopperProps['referenceElement']
    | (() => PopperProps['referenceElement'])
  children?:
    | ((props: PopperChildrenProps & { popperRef: ReactPopper }) => ReactNode)
    | ReactNode
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
   * popper 显示/隐藏之前触发的回调，返回值确定是否应该显示或者隐藏
   * */
  shouldToggle?(
    visible: boolean,
    context: ReactPopper,
    ev?: MouseEvent<any>,
  ): boolean

  /**
   * popper 显示/隐藏之后触发的回调
   *
   * The callback triggered after popper's show/hide
   * */
  afterToggle?(visible: boolean, context: ReactPopper): void
}
