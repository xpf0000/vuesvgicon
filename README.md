<h1 align="center">Vue-Svg-Icons</h1>

[![Latest Version on NPM](https://img.shields.io/npm/v/@xpf0000/vuesvgicon.svg?style=flat-square)](https://npmjs.com/package/@xpf0000/vuesvgicon)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![npm](https://img.shields.io/npm/dt/@xpf0000/vuesvgicon.svg?style=flat-square)](https://www.npmjs.com/package/@xpf0000/vuesvgicon)

> Vue2 Component for svg icon, On demand import


## Table of Contents

* [Features](#features)
* [Install and basic usage](#install-and-basic-usage)
  * [Props](#props)
* [Contributing](#contributing)
* [License](#license)

### Features

* No dependencies
* On demand import your svg icon
* free style and class

## Install and basic usage

```bash
$ npm install --save @xpf0000/vuesvgicon
```


Register the component and import css

```js
import Vue from 'vue'
import '@xpf0000/vuesvgicon/dist/VueSvgIcons.css'
import VueSvgIcons from '@xpf0000/vuesvgicon'
Vue.component('Icons', VueSvgIcons)
```
Add svg icon like text.js, you can use any svg code where you can found, like
https://www.iconfont.cn/

```js
import Icon from '@xpf0000/vuesvgicon'
Icon.register({
  'text': {
    'width': 300,
    'height': 150,
    'raw': `<defs>
<path id="path1" d="M75,20 a1,1 0 0,0 100,0" />
</defs>
<text x="10" y="100">
<textPath xlink:href="#path1">I love SVG I love SVG</textPath>
</text>`
  }
})
```

You may now use the component in your markup

```vue
<template>
  <div>
   <Icons name="text"></Icons>
  </div>
</template>

<script>
import './text.js'

export default {
  data: function () {},
  methods: {}
}
</script>
```

### Props

#### name
Type: `String`<br>
Required: `true`<br>
validator: `must registed`<br>

Used to set which svg icon to use

```html
<Icons name="registName">
```

#### flip
Type: `String`<br>
Required: `false`<br>
validator: `v | h | vh`

Used to set flip svg icon

```html
<Icons name="registName" flip="v">
```

#### spin
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Used to set a rotate animation to icon, but the best way is to add one yourself

```html
<Icons name="registName" :spin="true">
```

## Contributing

Any contribution to the code or any part of the documentation and any idea and/or suggestion are very welcome.

``` bash
# serve with hot reload at localhost:8080
npm run serve

# distribution build-bundle
npm run build-bundle
```

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
