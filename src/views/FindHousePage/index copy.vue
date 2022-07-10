<template>
  <div>
    <van-nav-bar title="账号登录" left-arrow>
      <van-icon name="arrow-left" slot="left" @click="$router.push('/home')" />
      <template #title>
        <div class="address-search">
          <van-search
            v-model="value"
            placeholder="请输入小区或地址"
            background="transparent"
            ><template v-slot:label>
              <span @click="$router.push('/city')"
                ><div class="location">
                  {{ $store.state.cityId.label || "AREA|88cff55c-aaa4-e2e0" }}
                </div></span
              >
            </template>
          </van-search>
        </div>
      </template>
      <template #right>
        <van-icon name="location-o" size="25" />
      </template>
    </van-nav-bar>
    <!--------------- 下拉列表 --------------->

    <van-dropdown-menu duration="0">
      <!-- 区域=======-->
      <van-dropdown-item duration="0" ref="areaDom" title="区域">
        <!-- 这是下拉内容的插槽 -->
        <template #default
          ><van-area
            title=""
            confirm-button-text="确认"
            cancel-button-text="取消 "
            :area-list="areaList"
            @cancel="areaHidden"
            @confirm="getCity"
          >
          </van-area>
        </template>
      </van-dropdown-item>
      <!-- 方式=======-->
      <van-dropdown-item duration="0" title="方式" ref="typeDom">
        <template #default
          ><van-area
            title=""
            confirm-button-text="确认"
            cancel-button-text="取消 "
            :area-list="rentypelist"
            @cancel="typeHidden"
            @confirm="getType"
            :columns-num="1"
          >
          </van-area>
        </template>
      </van-dropdown-item>
      <!-- 租金=======-->
      <van-dropdown-item title="租金" ref="priceDom">
        <template #default
          ><van-area
            title=""
            confirm-button-text="确认"
            cancel-button-text="取消 "
            :area-list="pricelist"
            @cancel="priceHidden"
            @confirm="getPrice"
            :columns-num="1"
          >
          </van-area> </template
      ></van-dropdown-item>
      <div>
        <!-- 筛选=======-->
        <van-dropdown-item title="筛选" @open="popupShow" ref="popupDom">
          <template #default>
            <van-popup
              v-model="show"
              position="right"
              v-if="show"
              :style="{ height: '100%' }"
            >
              <!-- 户型 -->
              <van-checkbox-group v-model="roomTypeResult">
                <div class="box">
                  <h1>户型</h1>
                  <van-row class="tags clicktags">
                    <van-checkbox
                      v-model="checked"
                      v-for="(item, index) in roomTypelist"
                      :name="item.value"
                      :key="index"
                    >
                      <template #icon="props">
                        <div class="biewu">
                          <div :class="props.checked ? 'chechbox' : ''">
                            {{ item.label }}
                          </div>
                        </div>
                      </template>
                    </van-checkbox>
                  </van-row>
                </div>
              </van-checkbox-group>
              <!-- /户型 -->
              <!-- 朝向 -->
              <van-checkbox-group v-model="orientedSelsetlist">
                <div class="box">
                  <h1>朝向</h1>
                  <van-row class="tags clicktags">
                    <van-checkbox
                      v-model="checked"
                      v-for="(item, index) in orientedlist"
                      :name="item.value"
                      :key="index"
                    >
                      <template #icon="props">
                        <div class="biewu">
                          <div :class="props.checked ? 'chechbox' : ''">
                            {{ item.label }}
                          </div>
                        </div>
                      </template>
                    </van-checkbox>
                  </van-row>
                </div>
              </van-checkbox-group>
              <!-- /朝向 -->
              <!-- 楼层 -->
              <van-checkbox-group v-model="floorSelsetlist">
                <div class="box">
                  <h1>楼层</h1>
                  <van-row class="tags clicktags">
                    <van-checkbox
                      v-model="checked"
                      v-for="(item, index) in floorlist"
                      :name="item.value"
                      :key="index"
                    >
                      <template #icon="props">
                        <div class="biewu">
                          <div :class="props.checked ? 'chechbox' : ''">
                            {{ item.label }}
                          </div>
                        </div>
                      </template>
                    </van-checkbox>
                  </van-row>
                </div>
              </van-checkbox-group>
              <!-- /楼层 -->
              <!-- 房屋亮点 -->
              <van-checkbox-group v-model="characterSelsetlist">
                <div class="box">
                  <h1>房屋亮点</h1>
                  <van-row class="tags clicktags">
                    <van-checkbox
                      v-model="checked"
                      v-for="(item, index) in characteristiclist"
                      :name="item.value"
                      :key="index"
                    >
                      <template #icon="props">
                        <div class="biewu">
                          <div :class="props.checked ? 'chechbox' : ''">
                            {{ item.label }}
                          </div>
                        </div>
                      </template>
                    </van-checkbox>
                  </van-row>
                </div>
              </van-checkbox-group>
              <!-- /房屋亮点 -->
              <!-- 底部提交按钮 -->
              <div class="dropdown-bottom">
                <van-button type="default" @click="cancelFn"
                  >默认按钮</van-button
                ><van-button type="primary" @click="sureFn"
                  >主要按钮</van-button
                >
              </div>
            </van-popup>
          </template>
        </van-dropdown-item>
        <!-- /筛选 -->
      </div>
    </van-dropdown-menu>
    <!-------------------- 房屋信息展示---------------------- -->
    <div class="houseMsg">
      <!-- 这是组件下拉加载 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 使用封装的组件 -->
        <RoomMessage
          :item="item"
          v-for="(item, index) in queryHouseList"
          :key="index"
        ></RoomMessage>
      </van-list>
    </div>
  </div>
</template>

<script>

// 获取房屋查询条件
import { slideShowPicApi, queryHouseApi } from '@/api/findhouse'
import { mapState } from 'vuex'
import RoomMessage from '@/components/RoomMessage.vue'
export default {
  name: 'findhosepage',

  data () {
    return {
      // 选择房子类型给后台传值
      roomTypeResult: [],
      // 选择房子朝向给后台传值
      orientedSelsetlist: [],
      // 选择房子楼层给后台传值
      floorSelsetlist: [],
      // 选择房子亮点给后台传值
      characterSelsetlist: [],
      // 区域的展示
      areaValueID: '',
      areaShow: false,
      checked: '',
      show: false,
      value: '',
      areaList: {
        province_list: {
        },
        city_list: {
        },
        county_list: {
        }
      },
      rentypelist: {
        province_list: {
        }
      },
      pricelist: {
        province_list: {
        }
      },
      loading: false,
      finished: false,
      // 帅选后的查询到的城市列表
      queryHouseList: [],
      characteristiclist: [],
      orientedlist: [],
      roomTypelist: [],
      floorlist: [],
      // 点击下拉选择的结果用来保存传给getqueryHouse的值
      selectDataList: [],
      slideShowList: {
        area: '',
        subway: ''
      },
      start: 1,
      end: 10,
      queryHouseObj: {
        cityId: this.$store.state.cityId.value || 'AREA|88cff55c-aaa4-e2e0',
        area: '',
        subway: '',
        rentType: '',
        price: '',
        more: '',
        roomType: '',
        oriented: '',
        characteristic: '',
        floor: '',
        start: this.start,
        end: this.end
      },
      rentTypeData: [],
      priceData: []
    }
  },
  async created () {
    this.getqueryHouse(this.queryHouseObj)
    // 这是房屋查询条件
    // 这里从vuex中获取到cityId，动态的实现数据的更新
    const res = await slideShowPicApi(this.$store.state.cityId.value || 'AREA|88cff55c-aaa4-e2e0')
    this.slideShowList.area = res.data.body.area.children
    this.slideShowList.subway = res.data.body.subway.children
    const result = res.data.body
    console.log(res)
    this.characteristiclist = result.characteristic
    this.floorlist = result.floor
    this.orientedlist = result.oriented
    this.roomTypelist = result.roomType
    // 处理数据
    // 筛选区域province_list
    // 筛选区域city_list、
    const areadata = result.area
    this.selectData(areadata, '11', this.areaList)
    // 筛选地铁city_list、
    const subwayData = result.subway
    this.selectData(subwayData, '12', this.areaList)
    // 获取方式的
    this.rentTypeData = result.rentType
    this.selectRentType(this.rentTypeData, '13', this.rentypelist)
    // 获取价格的
    this.priceData = result.price
    this.selectRentType(this.priceData, '14', this.pricelist)
  },
  methods: {
    // 地域取消的按钮
    areaHidden () {
      this.$refs.areaDom.toggle()
    },
    // 获取低于到筛选的数据
    async getCity (value) {
      console.log(value)
      this.$refs.areaDom.toggle()
      const arr = [].slice.call(value)
      console.log(arr)
      const www = this.recursionFn(arr)
      // recursionFn (arr) 获取到的值
      console.log(www)
      console.log(this.slideShowList)
      this.diguiFn(this.slideShowList, www)
      console.log(this.queryHouseObj)
      console.log(this.areaValueID)
      this.queryHouseList = []
      this.getqueryHouse(this.queryHouseObj)
      // value.forEach(item => {
      //   item.name
      // })
      // 获取到这个值之后，传给getqueryHouse去查询，用一个对象来保存传给getqueryHouse的值
      //  this.getqueryHouse()
    },
    typeHidden () {
      this.$refs.typeDom.toggle()
    },
    getType (val) {
      this.$refs.typeDom.toggle()
      console.log(val)
      this.selectValue(this.rentTypeData, val, this.queryHouseObj.rentType)
      this.queryHouseList = []
      this.getqueryHouse(this.queryHouseObj)
    },
    priceHidden () {
      this.$refs.priceDom.toggle()
    },
    getPrice (val) {
      console.log(val)
      this.$refs.priceDom.toggle()
      this.selectValue(this.priceData, val, this.queryHouseObj.price)
      this.queryHouseList = []
      this.getqueryHouse(this.queryHouseObj)
    },
    async getqueryHouse (queryHouseObj) {
      try {
        // console.log(this.cityId)
        const { data } = await queryHouseApi(queryHouseObj)
        if (data.body.list.length === 0) {
          this.finished = true
          return
        }
        this.queryHouseList.push(...data.body.list)
        // console.log(this.queryHouseList)
        // console.log(data)
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    // 先处理一下自己的点筛选的城市的做一个递归，实现最终需要去整个数据里面需要递归找到的数据
    recursionFn (arr) {
      const val = arr.pop()
      if (val) {
        if (val.name !== '' && val.name !== '不限') {
          return val.name
        } else {
          const values = []
          values.push(...arr)
          const one = this.recursionFn(values)
          return one
        }
      }
    },

    // 接着在将上面递归道德数据，在到大数据里递归数据
    diguiFn (obj, www) {
      if (obj instanceof Array) {
        // console.log(obj)
        obj.forEach(item => {
          if (item.label === www) {
            this.queryHouseObj.area = item.value
            // console.log(this.areaValueID)
          } else if (item.children) {
            return this.diguiFn(item.children, www)
          }
        })
      } else if (obj instanceof Object) {
        // console.log(obj)
        for (const key in obj) {
          // eslint-disable-next-line no-unused-expressions
          this.diguiFn(obj[key], www)
          // console.log(key)
        }
      }
    },
    // 定义一个方法筛选房屋类型和价格的value的值,data表是下拉选中的那一个数组,list是数据
    selectValue (list, arr, obj) {
      if (arr[0].name === '不限') {
        obj = ''
        return
      }
      list.forEach(item => {
        if (item.label === arr[0].name) {
          obj = item.value
        }
      })
    },
    // 列表加载
    onLoad () {
      // console.log('触发了')
      this.start = this.start + 10
      this.end = this.end + 10
      this.getqueryHouse()
    },
    // 点击跳转到详情页
    todetailpage (houseCode) {
      console.log(houseCode)
    },
    // 封装一个方法，要用的时候，直接传入指定的参数，就可以获取到areaList
    /**
       *
       * @param {传入的第一级筛选菜单} areadata
       * @param {传入的第一级筛选菜单的编号} areaNum
       */
    selectData (areadata, areaNum, list) {
      const aaa = areaNum + '0000'
      list.province_list[aaa] = areadata.label
      if (areadata.children) {
        areadata.children.forEach((item, index) => {
          const num = areaNum + (index < 10 ? '0' + index : index) + '00'
          list.city_list[num] = item.label
          // 筛选区域county_list
          if (item.children) {
            item.children.forEach((ele, count) => {
              const number = areaNum + (index < 10 ? '0' + index : index) + (count < 10 ? '0' + count : count)
              list.county_list[number] = ele.label
            })
          }
        })
      }
    },
    // 筛方式
    selectRentType (areadata, areaNum, list) {
      areadata.forEach((item, index) => {
        const num = areaNum + (index < 10 ? '0' + index : index) + '00'
        list.province_list[num] = item.label
        // 筛选区域county_list
      })
    },
    popupShow () {
      this.show = true
      console.log(123)
    },
    // 右边弹出层的取消按钮
    cancelFn () {
      this.$refs.popupDom.toggle()
    },
    sureFn () {
      this.$refs.popupDom.toggle()
    }
  },
  computed: { ...mapState(['cityId']) },
  watch: {},
  filters: {},
  components: {
    RoomMessage
  }
}
</script>

<style scoped lang='less'>
.address-search {
  .van-icon {
    line-height: 44px;
    color: #fff;
  }
  .van-search__label {
    display: flex;
    align-items: center;
    .location {
      height: 20px;
      width: 42px;
      border-right: 1px solid #9c9fa1;
    }
  }
}
.van-search__label {
  line-height: unset;
}
/deep/.van-search__content {
  width: 280px;
}
/deep/.van-nav-bar__title {
  max-width: unset;
  display: unset;
}
//  <!-- 取消和确定的键 -->
.select-bottom {
  height: 50px;
  width: 375px;
  background-color: pink;
  font-size: 18px;
  .cancel {
    width: 125px;
    height: 50px;
  }
  .define {
    width: 250px;
    height: 50px;
    background-color: #21b97a;
  }
}

.van-picker {
  position: relative;
}
/deep/ .van-picker__cancel {
  width: 125px;
  height: 50px;
  color: #21b97a;
  border: #21b97a 1px solid;
}
/deep/ .van-picker__confirm {
  width: 250px;
  height: 50px;
  background-color: #21b97a;
  color: #fff;
}
/deep/ .van-area {
  height: 349px;
}
// 房屋信息展示的组件
.van-card {
  height: 120px;
  padding-top: 18px;
  /deep/van-image,
  /deep/ .van-card__thumb,
  .van-image__img {
    width: 106px;
    height: 80px;
  }
  .van-card__content {
    padding-left: 12px;
  }
  .van-ellipsis {
    width: 220px;
    font-size: 15px;
    color: #394043;
    font-weight: bold;
    line-height: 22px;
  }
  .van-card__desc {
    font-size: 12px;
    color: #afb2b3;
    line-height: 22px;
  }
  .one {
    color: #39becd;
    background: #e1f5f8;
    margin-right: 5px;
  }
  .van-card__price {
    font-size: 21px;
    color: #fa5741;
  }
  .singlermb {
    font-size: 16px;
    color: #fa5741;
  }
}
/deep/ .van-picker__toolbar {
  position: absolute;
  bottom: 0px;
  z-index: 9;
}
/deep/.van-dropdown-menu__bar--opened {
  z-index: 1;
}
// /deep/.van-overlay {
//   max-width: 295px;
// }
.van-row[data-v-ae097a62],
.tags[data-v-ae097a62] {
  min-width: unset;
}
.box {
  margin-left: 15px;
  width: 265px;
  padding-top: 15px;
  // 点击tags时候添加类
  h1 {
    margin: 20px 0;
    font-size: 15px;
  }
}
/deep/.van-checkbox__icon {
  border: 1px solid #ddd;
  margin-bottom: 10px;
}
.van-row,
.tags {
  margin-right: 20px;
  margin-left: 40px;
  max-width: 180px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: rgb(124, 96, 96) 1px solid;
  .biewu {
    text-align: center;
    line-height: 30px;
    width: 68px;
    text-align: center;
    font-size: 12px;
    margin: 0 10px 15px 0 !important;
    .chechbox {
      color: #21b97a;
      border: #21b97a 1px solid;
    }
  }

  // align-items: center;
}
/deep/ .van-checkbox__icon {
  height: 32px;
  width: 70px;
}
.van-col--12 {
  width: 100%;
}
.van-checkbox {
  width: 75px;
}
.dropdown-bottom {
  position: sticky;
  bottom: 0;
  width: 100%;
  .van-button {
    width: 50%;
  }
}
</style>
