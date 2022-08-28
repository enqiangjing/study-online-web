<template>
  <!-- 富文本编辑器容器 -->
  <div id="wang_eidtor_id"></div>
</template>

<script>
export default {
  name: 'EditorMyEditor',

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  methods: {
    // 文本编辑器初始化
    init_editor() {
      const editor = this.$wangeditor('#wang_eidtor_id')
      // 配置 onchange 回调函数
      editor.config.onchange = (newHtml) => {
        this.$emit('input', newHtml)
      }
      // 设置高度
      editor.config.height = 500
      // 图片以 base64 保存
      editor.config.uploadImgShowBase64 = true
      editor.create()
      // 设置初始值必须在 create 之后
      editor.txt.html(this.value)
    },
  },

  mounted() {
    this.init_editor()
  },
}
</script>

<style lang="less" scoped>
#wang_eidtor_id {
  text-align: left;
  color: #000;
}
</style>