import React, { Component, ReactNode } from 'react'
import { Popper, PopperProps } from 'react-popper'

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
}

function containsOrEqual<T extends PopperProps['referenceElement']>(
  parent: T,
  target?: HTMLElement,
) {
  if (!target || !(parent instanceof HTMLElement)) return false
  return parent && (parent === target || parent.contains(target))
}

function getReferenceEl<T extends PopperProps['referenceElement']>(
  popperRef?: HTMLElement,
  referenceRef?: T,
) {
  return referenceRef || (popperRef && popperRef.parentElement) || undefined
}

export default class ReactPopper extends Component<
  ReactPopperProps,
  { visible: boolean; isMounted: boolean }
> {
  private timer: any = null
  private popperRef?: HTMLDivElement

  constructor(props: ReactPopperProps) {
    super(props)
    this.state = {
      visible: false,
      isMounted: false,
    }
  }

  private get referenceEl() {
    return getReferenceEl(this.popperRef, this.props.referenceRef)
  }

  private get isHover() {
    return this.props.trigger === TriggerType.hover
  }

  private get eventName() {
    return this.isHover ? 'mouseover' : 'click'
  }

  /**
   * Show the popper
   *
   * Use it outside the component:
   *
   * <ReactPopper ref={compInstance => ref = compInstance}></ReactPopper>
   * ref.show()
   * */
  show = () => this.setState({ visible: true })

  /**
   * Hide the popper
   *
   * Use it outside the component: same as method show
   * */
  hide = () => this.setState({ visible: false })

  /**
   * Toggle the popper
   *
   * Use it outside the component: same as method show
   * */
  toggle = () => this.setState(preState => ({ visible: !preState.visible }))

  componentDidMount(): void {
    this.setState({ isMounted: true })

    window.addEventListener(this.eventName, this.eventHandler, true)
  }

  componentWillUnmount(): void {
    window.removeEventListener(this.eventName, this.eventHandler, true)
  }

  render() {
    const {
      placement,
      className,
      forceShow,
      children,
      positionFixed = true,
      modifiers,
    } = this.props

    const { visible, isMounted } = this.state

    return (
      <Popper
        positionFixed={positionFixed}
        placement={placement || 'bottom-start'}
        referenceElement={this.referenceEl}
        modifiers={modifiers}
      >
        {({ ref, style, placement: $placement, arrowProps }) => {
          return (
            <div
              ref={(el: HTMLDivElement) => {
                ref(el)
                this.popperRef = el
              }}
              className={`react-popper ${className || ''} ${
                forceShow ? 'force-show' : ''
              } ${!isMounted || !visible ? 'hide' : 'show'}`
                .trim()
                .replace(/\s\s+/g, ' ')}
              style={style}
              data-placement={$placement}
            >
              <div
                className="arrow"
                data-placement={$placement}
                ref={arrowProps.ref}
                style={arrowProps.style}
              />
              {children}
            </div>
          )
        }}
      </Popper>
    )
  }

  private eventHandler = (ev: any) => {
    clearTimeout(this.timer)
    if (!containsOrEqual(this.popperRef, ev.target)) {
      if (!containsOrEqual(this.referenceEl, ev.target)) {
        this.timer = setTimeout(() => {
          this.hide()
        }, 200)
      } else if (this.isHover) {
        this.show()
      } else {
        this.toggle()
      }
    }
  }
}
