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
      >导出图</el-button
    >
    <el-button
      size="small"
      style="float: right; margin-top: 6px; margin-right: 6px"
      >导出图片</el-button
    >
    <el-button
      size="small"
      style="float: right; margin-top: 6px; margin-right: 6px"
      >查看流程图</el-button
    >
    <el-dialog title="查看流程图" width="60%"> </el-dialog>
    </div>
  </div>
</template>
<script>

export default {
  beforeCreate () {
    this.showAttrConfigInit = false;
    this.$store.showAttrConfig = this.showAttrConfigInit;
  },
  data() {
    return {
      showAttrConfig: false,
      nodeFrmData: {},
      initScale: 1,
      viewTranslate: { graphX: 0, graphY: 0 },
      list: [
        {
          name: "节点2",
          icon: "节点2",
          classStr: "outer",
          nodeType: "2",
        },
        {
          name: "节点1",
          icon: "节点1",
          nodeType: "1",
        },
        {
          name: "节点3",
          icon: "节点3",
          classStr: "circular",
          nodeType: "3",
        },
        {
          name: "节点4",
          icon: "节点4",
          classStr: "circular",
          nodeType: "6",
        },
      ],
    };
  },
  beforeDestroy() {},
  mounted() {
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
    delNode() {
      this.$store.graphX6.deleteCells();
      this.showAttrConfig = false;
    },
    undo() {
      console.log("undo")
      debugger
      this.$store.graphX6.history.undo();
    },
    redo() {
      console.log("redo")
      debugger
      this.$store.graphX6.history.redo();
    },




  },
};
</script>
<style lang="scss" >
.tool-bar {
  height: 60px;
  width: 600px;
  position: fixed;
  top: 10px;
  left: 20%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-evenly;
  border: 1px solid #555555;
  border-radius: 8px;
  .manager {
    float: left;
    display: flex;
    top: 10px;
    left: 10%;
    transform: translateX(-50%);
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
