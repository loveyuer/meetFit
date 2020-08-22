<template>
  <div class="coach-detail">
    <div class="preview" v-html="detail"></div>
    <div class="ueditor">
      <VueUeditorWrap v-model="detail" :config="editorConfig" />
    </div>
  </div>
</template>
<script>
import VueUeditorWrap from "vue-ueditor-wrap";
export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      detail: "",
      // 简单配置
      editorConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 300,
        // 初始容器宽度
        initialFrameWidth: "100%",
        //
        UEDITOR_HOME_URL: "/public/UE/"
      }
    };
  },
  created() {
    this.getConfig();
  },
  methods: {
    getConfig() {
      this.$http
        .get("/index.php/admin/ContentEditor/index?action=config")
        .then(res => {
          this.editorConfig = res;
        });
    }
  }
};
</script>
