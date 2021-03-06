import React, { Component } from 'react'
import { Popper, PopperProps } from 'react-popper'
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
  popperRef?: HTMLDivElement
  arrowRef?: HTMLDivElement
  timer: { type: 'show' | 'hide' | ''; id: any } = {
    type: '',
    id: null,
  }

  constructor(props: ReactPopperProps) {
    super(props)
    this.state = {
      visible: false,
      isMounted: false,
    }
  }

  get referenceEl(): PopperProps['referenceElement'] {
    return getReferenceEl(this.popperRef, this.props.referenceRef)
  }

  get isHover() {
    return this.props.trigger === TriggerType.hover
  }

  get eventName() {
    return this.isHover ? 'mouseover' : 'click'
  }

  get modifiers(): PopperProps['modifiers'] {
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

  get visible() {
    return this.props.forceShow || this.state.visible
  }

  get delayShow() {
    return this.props.delayShow || 0
  }

  get delayHide() {
    return this.props.delayHide || (this.isHover ? 200 : 0)
  }

  get shouldToggle(): NonNullable<ReactPopperProps['shouldToggle']> {
    return this.props.shouldToggle || (() => true)
  }

  /**
   * Show the popper
   *
   * Use it outside the component:
   *
   * <ReactPopper ref={compInstance => ref = compInstance}></ReactPopper>
   * ref.show()
   * */
  show = (ev?: React.MouseEvent<any>) => {
    if (
      this.shouldToggle(true, this, ev) &&
      ((!this.delayShow && !this.state.visible) || this.timer.type !== 'show')
    ) {
      clearTimeout(this.timer.id)
      const fn = () => {
        if (this.popperRef) {
          const visible = this.visible
          this.setState({ visible: true }, () => {
            this.afterToggle(visible)
            this.scheduleUpdate!()
          })
        }
      }
      if (this.delayShow) this.timer.id = setTimeout(fn, this.delayShow)
      else fn()
      this.timer.type = 'show'
    }
  }

  /**
   * Hide the popper
   *
   * Use it outside the component: same as method show
   * */
  hide = (ev?: React.MouseEvent<any>) => {
    if (
      this.shouldToggle(false, this, ev) &&
      ((!this.delayHide && this.state.visible) || this.timer.type !== 'hide')
    ) {
      clearTimeout(this.timer.id)
      const fn = () => {
        if (this.popperRef) {
          this.setState(
            { visible: false },
            this.afterToggle.bind(null, this.visible),
          )
        }
      }
      if (this.delayHide) this.timer.id = setTimeout(fn, this.delayHide)
      else fn()
      this.timer.type = 'hide'
    }
  }

  /**
   * Toggle the popper
   *
   * Use it outside the component: same as method show
   * */
  toggle = (ev?: React.MouseEvent<any>) => {
    if (this.state.visible) this.hide(ev)
    else this.show(ev)
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
                ? (children as Function)({ ...props, popperRef: this })
                : children}
            </div>
          )
        }}
      </Popper>
    )
  }

  private eventHandler = (ev: any) => {
    if (!containsOrEqual(this.popperRef, ev.target)) {
      if (!containsOrEqual(this.referenceEl, ev.target)) this.hide(ev)
      else if (this.isHover) this.show(ev)
      else this.toggle(ev)
    } else this.show(ev)
  }

  private afterToggle = (prevVisible: boolean) => {
    if (this.props.afterToggle && prevVisible !== this.visible)
      this.props.afterToggle(this.visible, this)
  }
}
