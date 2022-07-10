<template>
  <div>
    <van-nav-bar left-arrow>
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />
      <template #title>
        <div class="address-search">
          <form action="/">
            <van-search
              v-model="value"
              show-action
              placeholder="请输入搜索关键词"
              @search="onSearch"
              @cancel="onCancel"
              @input="inputFn(value)"
            />
          </form>
        </div>
      </template>
    </van-nav-bar>
    <!-- 搜索结果 -->
    <van-cell-group
      v-for="(item, index) in SearchAreaList"
      :key="index"
      @click="getCommunity(item)"
    >
      <van-cell :title="item.communityName" />
    </van-cell-group>
  </div>
</template>

<script>
import { getSearchAreaApi } from '@/api/searcharea'
export default {
  created () {
    this.id = this.$store.state.cityId.value || 'AREA|88cff55c-aaa4-e2e0'
  },
  data () {
    return {
      value: '',
      id: '',
      name: '',
      SearchAreaList: []
    }
  },
  methods: {
    onSearch (val) {
      this.$toast(val)
    },
    onCancel () {
      this.$toast('取消')
    },
    // 输入框输入的时候触发
    inputFn (val) {
      this.name = val
      this.getSearchArea(this.name, this.id)
      console.log(val)
    },
    // 封装分请求数据的
    async getSearchArea (name, id) {
      try {
        const res = await getSearchAreaApi(name, id)
        console.log(res)
        this.SearchAreaList = res.data.body
        if (res.data.body.length === 0) {
          this.$toast.fail('暂时没有覆盖该小区，请换个关键词试试！')
          return
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 点击的时候获取到community的值
    getCommunity (val) {
      // 保存到vuex中，方便在其他页面调用这个数据
      this.$store.commit('getCommunityValue', val || 'AREA|88cff55c-aaa4-e2e0')
      this.$router.push('/addroom')
      console.log(val)
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less" >
/deep/.van-nav-bar__title {
  max-width: unset;
  width: 280px;
}
/deep/.van-icon-search {
  color: #21b97a;
}
</style>
