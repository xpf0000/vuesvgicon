import Icon from '../components/vue-svg-icons'

Icon.register({
  'test1': {
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
