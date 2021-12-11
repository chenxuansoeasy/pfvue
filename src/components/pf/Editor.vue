<template>
  <div class="content">
    <div class="app-stencil" ref="stencilContainer"></div>
    <div ref="x6Editor" class="app-content" id="x6Editor"></div>
    <model :show.sync="showNodeConfig" :aria-modal="true" title="属性配置" @keyup.stop.native="">
      <div slot="content">
        <el-form
          :model="nodeFrmData"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="Name" prop="name">
            <el-input v-model="nodeFrmData.name" maxLength="14"></el-input>
          </el-form-item>
          <el-form-item label="Type" prop="type" v-show="ifDesignDomain">
            <el-select v-model="nodeFrmData.type">
              <el-option label="B" value="B"></el-option>
              <el-option label="C" value="C"></el-option>
              <el-option label="X" value="X"></el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-button @click="showCausal">addCausalProperties
            </el-button>
          </div>
          <div>
            <el-button>delete
            </el-button>
          </div>

        </el-form>
      </div>
      <span slot="footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
    </model>
    <model :show.sync="showEdgeConfig" title="edgeConfig" @keyup.stop.native="">
      <div slot="content">
        <el-tag
          :key="property"
          v-for="property in edgeFrmData.properties"
          closable
          :disable-transitions="false"
          @close="handleClose(property)">
          {{ property }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="edgeFrmData.inputVisible"
          v-model="edgeFrmData.inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </div>
      <span slot="footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="confirmEdge">确定</el-button>
        </span>
    </model>
    <model :show.sync="showCausalConfig" title="CasualConfig" @keyup.stop.native="">
      <div slot="content">
        <div style="float: left;width: 50%">
          <el-table
            ref="table1"
            :data="allProp"
            tooltip-effect="dark"
            max-height="250"
            style="width: 90%"
            @selection-change="handleSelectionChange1">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="propertyList"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
        <div style="float: left;width: 50%">
          <el-table
            ref="table2"
            max-height="250"
            :data="allProp"
            tooltip-effect="dark"
            style="width: 90%"
            @selection-change="handleSelectionChange2">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="propertyList"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-button @click="toggleSelection()">取消选择</el-button>
          <el-button @click="addCausal">addCausal</el-button>
        </div>
        <div>
          <el-table
            :data="nodeFrmData.relation"
            max-height="250"
          >
            <el-table-column
              prop="name"
              label="casual"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, nodeFrmData.relation)"
                  type="text"
                  size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>


      </div>
      <span slot="footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="causalConfirm">确定</el-button>
        </span>
    </model>
  </div>
</template>
<script>
import {Graph, Shape, Addon} from '@antv/x6'
import Model from './Model.vue'

const {Stencil} = Addon
import {DesignDomain, GivenDomain, Machine, Requirement} from '../model/pf'

let time = null
export default {
  data () {
    return {
      showNodeConfig: false,
      showCausalConfig: false,
      showEdgeConfig: false,
      ifDesignDomain: false,
      nodeFrmData: {
        relation: [],
      },
      edgeFrmData: {
        properties: [],
        inputVisible: false,
        inputValue: ''
      },
      modifyNode: {},
      modifyEdge: {},
      property: '',
      allProp: [{name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}, {name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}],
      multipleSelection1: [],
      multipleSelection2: [],
      relation: [{name: 'a->b'}, {name: 'a->b'}, {name: 'a->b'}, {name: 'a->b'}, {name: 'a->b'}, {name: 'a->b'}]
    }
  },
  components: {
    Model
  },

  mounted () {

    this.init()

    let graph = this.$store.graphX6
    let currentNode = this.$store.currentNode
    let editor = this
    graph.on('edge:dblclick', ({e, x, y, edge, view}) => {
      clearTimeout(time)
      debugger
      if (currentNode) {
        currentNode.isEdge() ? this.selectEdge(currentNode, false) : this.selectNode(currentNode, false)
      }
      if (edge) {
        debugger
        currentNode = edge
        editor.selectEdge(edge, true)
        editor.modifyEdge = edge
        debugger
        //Todo assign edgeFrmData对象空数组 参考 node
        if (edge.getData()) {
          editor.edgeFrmData.properties = Object.assign(editor.edgeFrmData.properties, edge.getData().properties)
        } else {
          editor.edgeFrmData.properties = []
        }
        editor.showEdgeConfig = true
      } else {
        editor.showEdgeConfig = false
      }
    })

    //双击打开属性选择页面
    graph.on('node:dblclick', ({e, x, y, cell, view}) => {
      clearTimeout(time)
      debugger
      if (cell) {
        debugger
        if (cell.shape.indexOf('given') > 0) {
          editor.ifDesignDomain = true
        } else {
          editor.ifDesignDomain = false
        }
        editor.showNodeConfig = true
        graph.unselect(currentNode)
        currentNode = cell
        editor.modifyNode = cell
        graph.select(cell)
        editor.nodeFrmData = Object.assign({relation: []}, cell.getData() || {})
      } else {
        editor.showAttrConfig = false

      }
    })
    //单机选中 加缓存 currentNode
    graph.on('cell:click', ({e, x, y, cell, view}) => {

      clearTimeout(time)
      time = setTimeout(() => {
        debugger
        if (!currentNode) {
          currentNode = cell
          //&& cell.cid === this.$store.currentNode.cid
          currentNode.isEdge() ? currentNode.setAttrs({
            line: {
              stroke: '#ff0303',
              strokeDasharray: '5,5',
            }
          }) : graph.select(cell)
          return
        }
        if (cell.id == currentNode.id) return

        if (cell.id !== currentNode.id) {
          graph.unselect(currentNode)
          //graph.select(node)
          graph.unselect(cell)
          if (currentNode.isNode() && cell.isNode()) {
            let edges = graph.getEdges()
            let ifHasPath = false
            debugger
            edges.forEach((item) => {
              ifHasPath = (item.target.cell == cell.id && item.source.cell == currentNode.id)
                || (item.target.cell == currentNode.id && item.source.cell == cell.id)
            })
            if (!ifHasPath) {
              let edgeId = graph.addEdge(new Shape.Edge({
                source: currentNode,
                target: cell,
                attrs: {
                  line: {
                    sourceMarker: 'path',
                    targetMarker: 'path'
                  }
                }
              })).id
              // currentNode.getData().edgeIds ? node.setData({edgeIds:Object.assign(node.getData().edgeIds,edgeId)}) :node.setData({edgeIds:[edgeId]})
              // node.setData({'edgeIds':[edgeId]})
            } else {
              graph.select(cell)
              graph.unselect(currentNode)
            }
            currentNode = null
            return
          } else if (currentNode.isEdge() && cell.isEdge()) {
            this.selectEdge(cell, true)
            this.selectEdge(currentNode, false)

          } else if (currentNode.isEdge() !== cell.isEdge()) {
            if (currentNode.isEdge()) {
              this.selectEdge(currentNode, false)
              this.selectNode(cell, true)

            } else if (currentNode.isNode()) {
              this.selectEdge(cell, true)
              this.selectNode(currentNode, false)

            }
          }
        }
        currentNode = cell
      }, 300)
      //判断是否需要连线
    })
    graph.on('blank:click', ({e, x, y}) => {
      if (!currentNode) {
        //doNothing
      } else if (currentNode.isEdge()) {
        currentNode.setAttrs({
          line: {
            stroke: '#000000',
            strokeDasharray: '1,0',
          }
        })
        currentNode = null
      } else if (currentNode.isNode()) {
        graph.unselect(currentNode)
        currentNode = null
      }
    })

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
      //console.log('graph up', data)
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
    addCausal () {
      let conflict = false
      debugger
      let arr1 = []
      let arr2 = []
      let edgeIds1 = []
      let edgeIds2 = []
      let conflictProp = ''
      this.multipleSelection1.forEach(item => {
        arr1.push(item.name)
        edgeIds1.push(item.id)
      })
      this.multipleSelection2.forEach(item => {
        arr2.push(item.name)
        edgeIds2.push(item.id)
      })
      this.multipleSelection2.forEach(item => {
        if (arr1.indexOf(item.name) != -1 || edgeIds1.indexOf(item.id) != -1) {
          conflict = true
          conflictProp = item.name
        }
      })
      if (conflict) {
        alert(conflictProp + '无法作用于自身')
      } else {
        let causalMap1 = new Map()
        let causalMap2 = new Map()
        this.multipleSelection1.forEach(item => {
          causalMap1.has(item.id) ? causalMap1.get(item.id).push(item.name) : causalMap1.set(item.id, [item.name])
        })
        this.multipleSelection2.forEach(item => {
          causalMap2.has(item.id) ? causalMap2.get(item.id).push(item.name) : causalMap2.set(item.id, [item.name])
        })
        for (let [key1, value1] of causalMap1.entries()) {
          for (let [key2, value2] of causalMap2.entries()) {
            this.nodeFrmData.relation.push({name: value1.join(',') + '->' + value2.join(','), id: key1 + '->' + key2})
          }
        }
        this.toggleSelection()
      }
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table1.toggleRowSelection(row)
          this.$refs.table2.toggleRowSelection(row)
        })
      } else {
        this.$refs.table1.clearSelection()
        this.$refs.table2.clearSelection()
      }
    },
    handleSelectionChange1 (val) {
      this.multipleSelection1 = val
    },
    handleSelectionChange2 (val) {
      this.multipleSelection2 = val
    },
    showCausal () {
      this.showCausalConfig = true

      if (this.modifyNode) {
        let edges = []
        let propArr = []
        let id = this.modifyNode.id
        this.$store.graphX6.getEdges().forEach(item => {
          if (item.source.cell == id || item.target.cell == id) {
            edges.push(item)
            if (item.getData()) {
              item.getData().properties.forEach(name => {
                propArr.push({id: item.id, name: name})
              })
            }
          }
        })
        this.allProp = Object.assign([], propArr)
      }

    },
    close () {
      this.showAttrConfig = false
    },
    selectEdge (edge, selected) {
      selected ? edge.setAttrs({
        line: {
          stroke: '#ff0303',
          strokeDasharray: '5,5',
        }
      }) : edge.setAttrs({
        line: {
          stroke: '#000000',
          strokeDasharray: '1,0',
        }
      })
    },
    selectNode (node, selected) {
      selected ? this.$store.graphX6.select(node) : this.$store.graphX6.unselect(node)
    },
    confirm () {
      let graph = this.$store.graphX6
      let selectedCell = this.modifyNode
      console.log(this.nodeFrmData)
      selectedCell.setData(this.nodeFrmData)
      let style = selectedCell.style
      if (selectedCell.shape === 'html') {
        //let     html = selectedCell.style.html;
        let temDom = document.createElement('div')
        //temDom.innerHTML = style.html;
        temDom.querySelector('[attr="name"]').innerText = this.nodeFrmData.name
        style.html = temDom.innerHTML
        //selectedCell.setStyle(style);
      } else if (selectedCell.isEdge()) {
        selectedCell.setLabels([{
          attrs: {label: {text: this.nodeFrmData.name}},
        }])
      } else if (selectedCell.isNode()) {
        selectedCell.setAttrs({text: {text: this.nodeFrmData.name}})
        selectedCell.setAttrs({label2: {text: this.nodeFrmData.type}})
      }
      this.showNodeConfig = false
      this.modifyNode = {}
    },
    confirmEdge () {
      let graph = this.$store.graphX6
      let selectedCell = this.modifyEdge
      console.log(this.edgeFrmData)
      selectedCell.setData(this.edgeFrmData)
      if (selectedCell.isEdge()) {
        selectedCell.setLabels([{
          attrs: {label: {text: this.edgeFrmData.properties.join(',')}},
        }])
      }
      this.showEdgeConfig = false
      this.edgeFrmData.properties = []
      this.modifyNode = {}
    },
    init () {
      const graph = new Graph({
        container: this.$refs.x6Editor,
        history: true,
        grid: {
          size: 10,
          visible: true
        },
        scroller: {
          enabled: true,
          pannable: true,
          pageVisible: true,
          pageBreak: false,
        },
        mousewheel: {
          enabled: true,
          modifiers: ['ctrl', 'meta'],
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
        selecting: {
          enabled: false,
          rubberband: false,
          showNodeSelectionBox: true
        }
      })

      //侧边栏的UI组件,支持分组、折叠、搜索等能力
      const stencil = new Stencil({
        title: 'Components',
        target: graph,
        //逐个搜索label
        search (cell, keyword) {
          debugger
          return (cell.label.indexOf(keyword) !== -1)
        },
        placeholder: 'Search by shape name',
        notFoundText: 'Not Found',
        collapsable: true,
        stencilGraphWidth: 240,
        stencilGraphHeight: 260,
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
          ellipse: {strokeDasharray: '0,0'},
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
          text: {text: 'GivenDomain', fill: '#000000', text2: 'DesignDomain'},
          name: {text: 'DesignDomain', fill: '#000000'}
        }
      })
      debugger
      //givenDomain.setLabel({label2: { text: 'DesignDomain'}})

      const designDomain = new DesignDomain({
        attrs: {
          text: {text: 'DesignDomain', fill: '#000000'}
        },
      })

      stencil.load([machine, designDomain, requirement, givenDomain, entity], 'pf')

      debugger
      console.log('end')
      this.$refs.stencilContainer.appendChild(stencil.container)
      this.$store.graphX6 = graph
      this.$store.undoManager = graph.history

    },
    propertyDel: function () {
      this.edgeFrmData.properties.splice(this.edgeFrmData.properties.indexOf(this.property), 1)
    },
    handleClose (property) {
      debugger
      this.property = property
      this.propertyDel()
      this.property = ''
    },

    showInput () {
      this.edgeFrmData.inputVisible = true
      this.$nextTick(_ => {
        debugger
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      debugger
      let inputValue = this.edgeFrmData.inputValue
      if (inputValue && this.edgeFrmData.properties.indexOf(inputValue) == -1) {
        this.edgeFrmData.properties.push(inputValue)
      } else {
        alert('属性已存在或属性不能为空')
      }
      this.edgeFrmData.inputVisible = false
      this.edgeFrmData.inputValue = ''
    },
    causalConfirm () {
      this.modifyNode.setData(this.nodeFrmData)
      this.showCausalConfig = false
    }

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
