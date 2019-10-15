# @livelybone/react-popper
[![NPM Version](http://img.shields.io/npm/v/@livelybone/react-popper.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-popper)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/react-popper.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-popper)
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

[English Document](./README.md)

对 [react-popper](http://npmjs.com/react-popper) 的再封装
1. 实现自动显示隐藏（通过 click/hover 事件），在组件外部可以通过 ref.show/ref.hide/ref.toggle 手动隐藏显示
2. 实现 arrow 位置控制

## repository
https://github.com/livelybone/react-popper.git

## Demo
https://github.com/livelybone/react-popper#readme

## Run Example
你可以通过运行项目的 example 来了解这个组件的使用，以下是启动步骤：

1. 克隆项目到本地 `git clone https://github.com/livelybone/form.git`
2. 进入本地克隆目录 `cd your-module-directory`
3. 安装项目依赖 `npm i`(使用 taobao 源: `npm i --registry=http://registry.npm.taobao.org`)
4. 启动服务 `npm run dev`
5. 在你的浏览器看 example (地址通常是 `http://127.0.0.1:3000/examples/test.html`)

## Installation
```bash
npm i -S @livelybone/react-popper
```

## Global name
`ReactPopper`

## Interface
去 [index.d.ts](./index.d.ts) 查看可用方法和参数

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
你可能需要主动引入样式文件来应用组件的样式：
```js
// scss
import 'node_modules/@auraxy/react-select/lib/css/index.scss'

// css
import 'node_modules/@auraxy/react-select/lib/css/index.css'
```
Or
```scss
// scss
@import 'node_modules/@auraxy/react-select/lib/css/index.scss';

// css
@import 'node_modules/@auraxy/react-select/lib/css/index.css';
```

你也可以通过引入自定义的组件样式文件来自定义样式，文件可以通过复制并修改 `node_modules/@auraxy/react-select/lib/css/index.scss` 得到

## QA

1. Error `Error: spawn node-sass ENOENT`

> 你可能需要全局安装 node-sass，`npm i -g node-sass`
