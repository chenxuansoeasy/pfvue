<template>
  <div class="pf">
    <toolbar-panel  @showHeadToTail="showHeadToTail($event)"></toolbar-panel>
    <editor :headToTail="headToTail" :nodes="nodes"></editor>
  </div>
</template>
<script>
import Editor from "./pf/Editor";
import ToolbarPanel from "./pf/ToolbarPanel.vue";

export default {
  name: "pf",
  components: {
    ToolbarPanel,
    Editor
  },
  mounted() {

  },
  data() {
    return {
      headToTail:false,
      nodes:[]
    }
  },
  methods: {
    showHeadToTail(e){
      debugger
      console.log("true")
      this.headToTail=e
      let graph = this.$store.graphX6.getNodes()
      this.nodes = []
      graph.forEach(node => {
        this.nodes.push({
         value: node.id,
          name: node.label
        })
      })
    }
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
