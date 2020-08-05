<template>
  <svg version="1.1"
    :class="klass"
    :role="label ? 'img' : 'presentation'"
    :aria-label="label"
    :viewBox="box"
    :style="style">
    <slot v-if="!backgroundImage">
      <template v-if="icon && icon.paths">
        <path v-if="icon && icon.paths" v-for="(path, i) in icon.paths" :key="`path-${i}`" v-bind="path"/>
      </template>
      <template v-if="icon && icon.polygons">
        <polygon v-for="(polygon, i) in icon.polygons" :key="`polygon-${i}`" v-bind="polygon"/>
      </template>
      <template v-if="icon && icon.raw"><g v-html="raw" v-bind="icon.g"></g></template>
    </slot>
  </svg>
</template>

<style>
.fa-icon {
  display: inline-block;
  fill: currentColor;
}

.fa-flip-h {
  transform: scale(-1, 1);
}

.fa-flip-v {
  transform: scale(1, -1);
}

.fa-flip-vh {
  transform: scale(-1, -1);
}

.fa-spin {
  animation: fa-spin 0.5s 0s infinite linear;
}

.fa-pulse {
  animation: fa-spin 1s infinite steps(8);
}

@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script>
let icons = {}
export default {
  name: 'fa-icon',
  props: {
    name: {
      type: String,
      validator (val) {
        if (val && !(val in icons)) {
          console.warn(`Invalid prop: prop "name" is referring to an unregistered icon "${val}".` +
            `\nPlease make sure you have imported this icon before using it.`)
          return false
        }
        return true
      }
    },
    width: [Number, String],
    height: [Number, String],
    spin: Boolean,
    pulse: Boolean,
    flip: {
      validator (val) {
        return val === 'h' || val === 'v' || val === 'vh'
      }
    },
    label: String,
    backgroundImage: Boolean,
    color: String
  },
  data () {
    return {
    }
  },
  computed: {
    klass () {
      return {
        'fa-icon': true,
        'fa-spin': this.spin,
        'fa-flip-h': this.flip === 'h',
        'fa-flip-v': this.flip === 'v',
        'fa-flip-vh': this.flip === 'vh',
        'fa-pulse': this.pulse,
        [this.$options.name]: true
      }
    },
    icon () {
      if (this.name) {
        return icons[this.name]
      }
      return null
    },
    box () {
      if (this.icon) {
        return `0 0 ${this.icon.width} ${this.icon.height}`
      }
      return `0 0 ${this.width} ${this.height}`
    },
    style () {
      if (this.backgroundImage) {
        let content = ''
        if (this.icon && this.icon.paths) {
          for (let path of this.icon.paths) {
            let str = ''
            for (let k in path) {
              str += `${k}='${path[k]}' `
            }
            content += `<path ${str.trim()}/>`
          }
        }
        if (this.icon && this.icon.polygons) {
          for (let path of this.icon.polygons) {
            let str = ''
            for (let k in path) {
              str += `${k}='${path[k]}' `
            }
            content += `<polygon ${str.trim()}/>`
          }
        }
        if (this.icon && this.icon.raw) {
          let str = ''
          for (let k in this.icon.g) {
            str += `${k}='${this.icon.g[k]}' `
          }
          content += `<g ${str.trim()}>${this.raw.replace(/"/g, '\'')}</g>`
        }
        let code = {
          '%': '%25',
          '!': '%21',
          '@': '%40',
          '&': '%26',
          '#': '%23'
        }
        let svg = `<svg viewBox='${this.box}' fill='${this.color}' version='1.1' xmlns='http://www.w3.org/2000/svg'>${content}</svg>`
        for (let k in code) {
          svg = svg.replace(new RegExp(k, 'g'), code[k])
        }
        let css = {
          'background-image': `url("data:image/svg+xml,${svg}")`,
          width: this.width,
          height: this.height
        }
        return css
      }
      return { color: this.color, width: this.width, height: this.height }
    },
    raw () {
      // generate unique id for each icon's SVG element with ID
      if (!this.icon || !this.icon.raw) {
        return null
      }
      let raw = this.icon.raw
      let ids = {}
      raw = raw.replace(/\s(?:xml:)?id=(["']?)([^"')\s]+)\1/g, (match, quote, id) => {
        let uniqueId = getId()
        ids[id] = uniqueId
        return ` id="${uniqueId}"`
      })
      raw = raw.replace(/#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g, (match, rawId, _, pointerId) => {
        let id = rawId || pointerId
        if (!id || !ids[id]) {
          return match
        }

        return `#${ids[id]}`
      })

      return raw
    }
  },
  mounted () {
    if (!this.name) {
      console.warn(`Invalid prop: prop "name" is required.`)
      return
    }
    if (!this.icon) {
      console.warn(`Invalid icon: prop "name" is not registed.`)
    }
  },
  register (data) {
    for (let name in data) {
      let icon = data[name]

      if (!icon.paths) {
        icon.paths = []
      }
      if (icon.d) {
        icon.paths.push({ d: icon.d })
      }

      if (!icon.polygons) {
        icon.polygons = []
      }
      if (icon.points) {
        icon.polygons.push({ points: icon.points })
      }

      icons[name] = icon
    }
  },
  icons
}

let cursor = 0xd4937
function getId () {
  return `fa-${(cursor++).toString(16)}`
}
</script>
