import { ReactNode } from 'react'
import { PopperProps } from 'react-popper'

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
}
