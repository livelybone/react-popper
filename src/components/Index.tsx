import React, { Component } from 'react'
import { Popper } from 'react-popper'
import { arrowModifier } from '../utils/modifiers'
import { ReactPopperProps, TriggerType } from '../utils/type'
import { containsOrEqual, getReferenceEl } from '../utils/utils'

export default class ReactPopper extends Component<
  ReactPopperProps,
  { visible: boolean; isMounted: boolean }
> {
  private popperRef?: HTMLDivElement
  private arrowRef?: HTMLDivElement

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

  private get modifiers() {
    const { modifiers, arrowOffset, arrowPosition } = this.props
    return {
      ...modifiers,
      arrow: {
        ...modifiers,
        element: this.arrowRef,
        fn: arrowModifier.bind(null, arrowPosition, arrowOffset),
      },
    }
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
    } = this.props

    const { visible, isMounted } = this.state

    return (
      <Popper
        positionFixed={positionFixed}
        placement={placement || 'bottom-start'}
        referenceElement={this.referenceEl}
        modifiers={this.modifiers}
      >
        {props => {
          const {
            ref,
            style,
            placement: $placement,
            arrowProps,
            scheduleUpdate,
          } = props
          scheduleUpdate()
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
                data-x-arrow={true}
                ref={(arrowEl: HTMLDivElement) => {
                  arrowProps.ref(arrowEl)
                  this.arrowRef = arrowEl
                }}
                style={arrowProps.style}
              />
              {typeof children === 'function'
                ? children({ ...props, popperRef: this })
                : children}
            </div>
          )
        }}
      </Popper>
    )
  }

  private eventHandler = (ev: any) => {
    if (!containsOrEqual(this.popperRef, ev.target)) {
      if (!containsOrEqual(this.referenceEl, ev.target)) {
        this.hide()
      } else if (this.isHover) {
        this.show()
      } else {
        this.toggle()
      }
    }
  }
}
