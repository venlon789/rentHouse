<template>
  <div>
    <!-- Picker 选择器 Popup 弹出层 -->
    <van-cell
      :title="title"
      is-link
      :value="selectValue === '' ? '请选择' : selectValue"
      @click="showPopup"
    />
    <van-popup v-model="show" position="bottom">
      <!-- Picker 选择器 -->
      <van-picker
        show-toolbar
        :columns="renderList"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    List: {
      type: Array,
      required: true
    },

    title: {
      required: true
    }

  },
  created () { },
  data () {
    return {
      show: false,
      selectValue: '',
      renderList: []
    }
  },
  methods: {
    showPopup () {
      this.show = true
    },
    onConfirm (val, index) {
      this.show = false
      this.selectValue = val
      const data = this.List[index]
      const value = data.value
      console.log(value)
      console.log()
      this.$emit('valueEvent', value)
    },
    onChange (picker, value, index) {
    },
    onCancel () {
      this.show = false
      this.selectValue = ''
    }
  },
  computed: {},
  watch: {
    List: {
      handler (newval) {
        console.log(newval)
        newval.forEach(item => this.renderList.push(item.label)
        )
      },
      immediate: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
