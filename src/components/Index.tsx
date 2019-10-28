import React, { Component } from 'react'
import { Popper } from 'react-popper'
import { arrowModifier } from '../utils/modifiers'
import { ReactPopperProps, TriggerType } from '../utils/type'
import { containsOrEqual, getReferenceEl } from '../utils/utils'

export default class ReactPopper extends Component<
  ReactPopperProps,
  { visible: boolean; isMounted: boolean }
> {
  /**
   * scheduleUpdate of popper
   * */
  scheduleUpdate!: () => void
  private popperRef?: HTMLDivElement
  private arrowRef?: HTMLDivElement

  constructor(props: ReactPopperProps) {
    super(props)
    this.state = {
      visible: !!this.props.forceShow,
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

  private get visible() {
    return this.props.forceShow || this.state.visible
  }

  static getDerivedStateFromProps(nextProps: any) {
    if (nextProps.forceShow) return { visible: nextProps.forceShow }
    return null
  }

  /**
   * Show the popper
   *
   * Use it outside the component:
   *
   * <ReactPopper ref={compInstance => ref = compInstance}></ReactPopper>
   * ref.show()
   * */
  show = () => {
    const visible = this.visible
    this.setState({ visible: true }, () => {
      this.afterToggle(visible)
      this.scheduleUpdate!()
    })
  }

  /**
   * Hide the popper
   *
   * Use it outside the component: same as method show
   * */
  hide = () => {
    this.setState({ visible: false }, this.afterToggle.bind(null, this.visible))
  }

  /**
   * Toggle the popper
   *
   * Use it outside the component: same as method show
   * */
  toggle = () => {
    const visible = this.visible
    this.setState(
      preState => ({ visible: !preState.visible }),
      () => {
        this.afterToggle(visible)
        this.scheduleUpdate()
      },
    )
  }

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
          this.scheduleUpdate = scheduleUpdate
          return (
            <div
              ref={(el: HTMLDivElement) => {
                ref(el)
                this.popperRef = el
              }}
              className={`react-popper ${className || ''} ${
                forceShow ? 'force-show' : ''
              } ${!isMounted || !visible ? 'hide' : 'show'}`.replace(
                /\s+(?=(\s|$))/g,
                '',
              )}
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
    if (!this.props.forceShow) {
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

  private afterToggle = (prevVisible: boolean) => {
    if (this.props.afterToggle && prevVisible !== this.visible)
      this.props.afterToggle(this.visible)
  }
}
