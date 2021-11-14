<template>
  <div class="pf">
    <toolbar-panel></toolbar-panel>

    <editor @showConfig="showConfig"></editor>
    <model :show.sync="showAttrConfig" title="属性配置" @keyup.stop.native="">
      <div slot="content">
        <el-form
          :model="nodeFrmData"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="名称" prop="name">
            <el-input v-model="nodeFrmData.name"></el-input>
          </el-form-item>
          <el-form-item label="属性1" prop="属性1">
            <el-input v-model="nodeFrmData.属性1"></el-input>
          </el-form-item>
          <el-form-item label="属性2" prop="属性2">
            <el-input v-model="nodeFrmData.属性2"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
    </model>
  </div>
</template>
<script>
import Editor from "./pf/Editor";
import ToolbarPanel from "./pf/ToolbarPanel.vue";
import Model from "./pf/Model.vue";

export default {
  name: "pf",
  components: {
    ToolbarPanel,
    Model,
    Editor
  },
  mounted() {

  },
  data() {
    return {
      showAttrConfig: false,
      nodeFrmData: {},
      initScale: 1,
    }

  },
  methods: {
    showConfig(val) {
      this.showAttrConfig = val
    },
    close() {
      this.showAttrConfig = false;
    },
    confirm() {
      let graph = this.$store.graphX6;
      let selectedCell = graph.getSelectedCells()[0];
      console.log(this.nodeFrmData)
      selectedCell.setData(this.nodeFrmData);
      let style = selectedCell.style;
      if (selectedCell.shape === "html") {
        //let html = selectedCell.style.html;
        let temDom = document.createElement("div");
        //temDom.innerHTML = style.html;
        temDom.querySelector('[attr="name"]').innerText = this.nodeFrmData.name;
        style.html = temDom.innerHTML;
        //selectedCell.setStyle(style);
      } else {
        selectedCell.label = this.nodeFrmData.name;
      }
      this.showAttrConfig = false;
    },
  }
};
</script>

<style lang='scss'>

.pf {
  display: flex;
  margin: 0 10px;
  border: 1px solid #555555;

}
</style>
