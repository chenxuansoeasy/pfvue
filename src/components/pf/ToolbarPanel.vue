<template>
  <div class="tool-bar">
    <div class="manager">
      <i
        @click="
          (e) => {
            scaleView(e, 'up');
          }
        "
        class="el-icon-zoom-in"
      ></i>
      <i
        @click="
          (e) => {
            scaleView(e, 'down');
          }
        "
        class="el-icon-zoom-out"
      ></i>
      <i @click="delNode" class="el-icon-delete"></i>
      <i @click="undo" class="el-icon-back"></i>
      <i @click="redo" class="el-icon-right"></i>
    </div>
    <div class="extendTool">
      <el-button
        size="small"
        style="float: right; margin-top: 6px; margin-right: 6px"
      >DFS
      </el-button
      >
      <el-button
        size="small"
        style="float: right; margin-top: 6px; margin-right: 6px"
        @click="headAndTail"
      >Head To Tail
      </el-button
      >
      <el-button
        size="small"
        style="float: right; margin-top: 6px; margin-right: 6px"
        @click="saveJson"
      >Save
      </el-button
      >
      <el-upload
        style="float: right; margin-top: 6px; margin-right: 6px"
        action=""
        :on-change="beforeUpload">
        <el-button size="small" type="primary">load</el-button>
      </el-upload>
      <el-button
        size="small"
        style="float: right; margin-top: 6px; margin-right: 6px"
        @click="center"
      >center
      </el-button>
    </div>

  </div>
</template>
<script>
import {exportJSON} from '../../utils/pfUtils'

export default {
  data() {
    return {

    }
  },
  beforeCreate () {

  },

  beforeDestroy () {
  },
  mounted () {
    // let graph = this.$store.graphX6;
    // graph.on("cell:dblclick", ({e, x, y, cell, view}) => {
    //   debugger
    //   if (cell) {
    //     this.showAttrConfig = true;
    //     this.nodeFrmData = Object.assign(cell.data || {}, {
    //       isNode: cell._isNode,
    //       isEdge: cell._isEdge,
    //     });
    //   } else {
    //     this.showAttrConfig = false;
    //   }
    // });
  },
  methods: {
    headAndTail() {
      debugger
      this.$emit('showHeadToTail',true)
    },
    delNode () {
      let cells = this.$store.graphX6.getSelectedCells()

      cells.forEach((item) => {
        if (item.isNode()) {

        }
      })
      this.$store.graphX6.removeCells(cells)
      this.showAttrConfig = false
    },
    undo () {
      console.log('undo')
      debugger
      this.$store.graphX6.history.undo()
    },
    redo () {
      console.log('redo')
      debugger
      this.$store.graphX6.history.redo()
    },
    saveJson () {
      exportJSON(this.$store.graphX6)
    },
    center () {
      this.$store.graphX6.centerContent()
    },
    beforeUpload (file) {
      let reader = new FileReader()
      debugger
      reader.readAsText(file.raw)
      reader.onload = (e) => {
        // 读取文件内容
        const cont = e.target.result
        console.log(cont)
        this.$store.graphX6.fromJSON(JSON.parse(cont))
        // 接下来可对文件内容进行处理
      }
    }
  },

}
</script>
<style lang="scss">
.tool-bar {
  height: 60px;
  width: 90%;
  position: fixed;
  top: 10px;
  left: 2%;
  display: flex;
  justify-content: space-evenly;
  border: 1px solid #555555;
  border-radius: 8px;

  .manager {
    float: left;
    display: flex;
    top: 30px;
    left: 5%;

    position: fixed;

    i {
      font-size: 18px;
      color: #555555;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        color: #4093ff;
      }
    }
  }

  .computeTool {
    font-size: 18px;
    float: right;
  }

  .extendTool {
    font-size: 18px;
    float: right;
  }
}
</style>
