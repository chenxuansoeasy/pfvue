<template>
  <div class="content">
    <div class="app-stencil" ref="stencilContainer"></div>
    <div ref="x6Editor" class="app-content" id="x6Editor"></div>
  </div>
</template>
<script>
import {Graph, Shape, Addon} from '@antv/x6'

const {Stencil} = Addon

const {Rect, Circle, Image} = Shape

import {DesignDomain, Entity, GivenDomain, Machine, Requirement} from '../model/pf'

export default {
  mounted () {

    this.init()

    let graph = this.$store.graphX6
    graph.on('cell:dblclick', ({e, x, y, cell, view}) => {
      debugger
      let showAttrConfig = false
      let nodeFramData = {}
      if (cell) {
        showAttrConfig = true
        nodeFramData = Object.assign(cell.data || {}, {
          isNode: cell.isNode(),
          isEdge: cell.isEdge(),
        })
      } else {
        showAttrConfig = false
      }
      this.$emit('showConfig', Object.assign(showAttrConfig, nodeFramData))
    })
    // dnd.start()
    graph.bindKey(
      ['del', 'backspace'],
      (e) => {
        this.delNode()
      },
      'keyup'
    )
    graph.bindKey(
      ['ctrl+z'],
      (e) => {
        this.undo()
      },
      'keyup'
    )
    graph.bindKey(['ctrl+plus'], (e) => this.scaleView(e, 'up'))
    graph.bindKey(['ctrl+-'], (e) => this.scaleView(e, 'down'))
    graph.on('selection:changed', (data) => {
      console.log('graph up', data)
      // if (data.selected.length === 0) {
      //   this.showAttrConfig = false
      // } else {
      //   this.showAttrConfig = true
      //   let cell = data.selected[0]
      //   this.nodeFrmData = Object.assign(cell.data || {}, {
      //     isNode: cell._isNode,
      //     isEdge: cell._isEdge
      //   })
      // }
    })

    const undoManager = graph.history

  },
  methods: {
    init () {
      const graph = new Graph({
        container: this.$refs.x6Editor,
        selecting: true,
        history: true,
        grid: {
          size: 10,
          visible: true
        },
        snapline: {
          enabled: true,
          sharp: true,
        },
        keyboard: {
          enabled: true, // 是否开启快捷键系统
          /*
           * 为 true 时绑定键盘事件到 document 上，否则绑定在 container 上。
           * 当绑定键盘事件在 container 上时，需要设置 container 的 tabIndex = -1 才能捕获键盘事件
           */
          global: true,
          escape: true, // 点击 esc 时是否终止连线、移动等交互
        },
        connecting: {
          //自动吸附
          snap: {
            radius: 50,
          },
          anchor: 'midSide',
          //不允许空白连线
          allowBlank: false,
        },
      })

      //侧边栏的UI组件,支持分组、折叠、搜索等能力
      const stencil = new Stencil({
        title: 'Components',
        target: graph,
        search (cell, keyword) {
          return cell.shape.indexOf(keyword) !== -1
        },
        placeholder: 'Search by shape name',
        notFoundText: 'Not Found',
        collapsable: true,
        stencilGraphWidth: 240,
        stencilGraphHeight: 240,
        resizeToFit: true,
        groups: [
          {
            name: 'pf',
            title: 'Problem Graph',
          }
        ],
      })
      const entity = new Requirement({
        attrs: {
          ellipse: {strokeDasharray: "0,0"},
          text: {text: 'entity', fill: 'white'},
        }
      })
      const machine = new Machine(
        {
          attrs: {
            text: {text: 'machine', fill: 'white'},
          }
        }
      )
      const requirement = new Requirement({
        attrs: {
          text: {text: 'requirement', fill: 'white'},
        },
      })

      const givenDomain = new GivenDomain({
        attrs: {
          text: {text: 'X', fill: 'white'},
        },
      })

      const designDomain = new DesignDomain({
        attrs: {
          text: {text: 'design', fill: 'white'},
        },
      })

      stencil.load([machine, designDomain, requirement, givenDomain, entity], 'pf')

      debugger
      console.log('end')
      this.$refs.stencilContainer.appendChild(stencil.container)
      this.$store.graphX6 = graph
      this.$store.undoManager = graph.history

    },
  },
}
</script>
<style scoped>


.content {
  font-family: sans-serif;
  display: flex;
}

.app-stencil {
  width: 250px;
  border: 1px solid #f0f0f0;
  position: relative;
}

.app-content {
  flex: 1;
  width: 1000px;
  height: 520px;
  margin-left: 8px;
  margin-right: 8px;
  box-shadow: 0 0 10px 1px #e9e9e9;
}
</style>
