import Icons from './vue-svg-icons'
function install (Vue, name) {
  if (install.installed) return
  install.installed = true
  Vue.component(name, Icons)
}
Icons.install = install
export default Icons
