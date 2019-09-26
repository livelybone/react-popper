# @livelybone/react-popper
[![NPM Version](http://img.shields.io/npm/v/@livelybone/react-popper.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-popper)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/react-popper.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-popper)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A wrap of react-popper, achieved visible controlling via click/hover event or ref.show/ref.hide/ref.toggle

## repository
https://github.com/livelybone/react-popper.git

## Demo
https://github.com/livelybone/react-popper#readme

## Run Example
Your can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/react-popper.git`
2. Go to the directory `cd your-module-directory`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1/examples/test.html`) in your browser

## Installation
```bash
npm i -S @livelybone/react-popper
```

## Global name
`ReactPopper`

## Interface
See in [index.d.ts](./index.d.ts)

## Usage
```typescript jsx
import React from 'react'
import ReactPopper, { PopperRefProps, ReactPopperProps, TriggerType } from '@livelybone/react-popper'
import 'node_modules/@livelybone/react-popper/lib/css/index.scss'

let popper = null

/** The popper auto show or hide when click the reference element */
const Comp = (
  <div className="reference">
    <ReactPopper
     className="custom-popper"
     forceShow={false}
     trigger={TriggerType.click}
     placement="bottom-start"
     positionFixed={true}
     referenceRef={undefined}
     modifiers={undefined}
     ref={p => popper = p}
     arrowPosition="middle"
     arrowOffset={15}
     >
     popper text
    </ReactPopper>
  </div>
)

/** Control it outside the component */
// show
// warning: Do not use `popper.setState({ visible: true })`,  otherwise, a bug that the position of the popper do not update when needs to be updated will be cause
popper.show()

// hide
popper.hide()

// toggle
popper.toggle()
```

You can receive the popper props and the instance of the component in the children function 
```typescript jsx
import React from 'react'
import ReactPopper, { PopperRefProps, ReactPopperProps, TriggerType } from '@livelybone/react-popper'
import 'node_modules/@livelybone/react-popper/lib/css/index.scss'

/** The popper auto show or hide when click the reference element */
const Comp = (
  <div className="reference">
    <ReactPopper
     className="custom-popper"
     forceShow={false}
     trigger={TriggerType.click}
     placement="bottom-start"
     positionFixed={true}
     referenceRef={undefined}
     modifiers={undefined}
     arrowPosition="middle"
     arrowOffset={15}
     >
     {({popperRef, ...popperProps}) => {
       return <>
       popper text
       <button onClick={() => popperRef.hide()}>hide the popper</button>
       </>
     }}
    </ReactPopper>
  </div>
)
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/react-popper/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/react-popper/lib/umd/<--module-->.js"></script>
```

## Props
```typescript
import { ReactNode, RefObject } from 'react'
import { PopperProps } from 'react-popper'

enum TriggerType {
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
}

interface PopperRefProps {
  show(): void

  hide(): void

  toggle(): void
}
```

## style
For building style, you can use the css or scss file in lib directory.
```js
// scss
import 'node_modules/@livelybone/react-popper/lib/css/index.scss'

// css
import 'node_modules/@livelybone/react-popper/lib/css/index.css'
```
Or
```scss
// scss
@import 'node_modules/@livelybone/react-popper/lib/css/index.scss'

// css
@import 'node_modules/@livelybone/react-popper/lib/css/index.css'
```

Or, you can build your custom style by copying and editing `index.scss`

## QA

1. Error `Error: spawn node-sass ENOENT`

> You may need install node-sass globally, `npm i -g node-sass`
