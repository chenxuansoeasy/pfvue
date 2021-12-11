<template>
  <div class="pf">
    <toolbar-panel></toolbar-panel>

    <editor></editor>

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
    }

  },
  methods: {

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
