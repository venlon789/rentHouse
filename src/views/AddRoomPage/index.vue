<template>
  <div>
    <van-nav-bar title="发布房源" left-arrow>
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <div class="rent-list">
      <div class="am-list-header">房源信息</div>
      <div class="am-list-item-middle">
        <van-cell-group @click="$router.push('/searcharea')">
          <van-cell
            title="小区名称"
            is-link
            :value="
              $store.state.area
                ? $store.state.area.communityName
                : '展示小区名称'
            "
          />
        </van-cell-group>
        <!--租金 允许输入正整数，调起纯数字键盘 -->
        <van-field
          v-model="digit"
          placeholder="请输入租金/月"
          label="租金"
          @input="getPriceValue"
          ><template #right-icon>￥/月</template>
        </van-field>
        <!--建筑面积 允许输入正整数，调起纯数字键盘 -->
        <van-field
          v-model="size"
          placeholder="请输入建筑面积"
          label="建筑面积"
          @input="getSizeValue"
          ><template #right-icon>㎡</template></van-field
        >
        <!-- 三个选择的组件的位置 -->
        <van-cell-group>
          <addRomSelect
            title="户型"
            :List="roomList"
            @valueEvent="getRoomTypeValueFn($event)"
          ></addRomSelect>
          <addRomSelect
            title="所在楼层"
            :List="foolList"
            @valueEvent="getFloorValueFn($event)"
          ></addRomSelect>
          <addRomSelect
            title="朝向"
            :List="directionList"
            @valueEvent="getDirectionValueFn($event)"
          ></addRomSelect>
        </van-cell-group>
        <!-- 房屋标题 -->
        <div class="am-list-header textColor">房屋标题</div>
        <van-cell-group>
          <van-field
            v-model="titlt"
            placeholder="请输入标题（例如：整租 小区名 2室 5000元） "
          />
        </van-cell-group>
        <div class="am-list-header textColor">房屋图像</div>
        <van-uploader
          :after-read="afterRead"
          v-model="fileList"
          multiple
          :max-count="3"
        />
        <div class="am-list-header textColor">房屋配置</div>
        <!-- 房屋设施情况layout -->
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <van-grid :column-num="5">
            <van-grid-item v-for="(item, index) in houseSheBei" :key="index">
              <template #default>
                <van-checkbox v-model="checked" :name="item.text">
                  {{ item.text }}
                  <template #icon="props">
                    <span :class="props.checked ? 'checkBocColor' : '#000'">
                      <span :class="'iconfont ' + item.icon"></span>
                    </span>
                  </template>
                </van-checkbox>
              </template>
            </van-grid-item>
          </van-grid>
        </van-checkbox-group>
        <!-- 房屋描述 -->
        <div class="am-list-header textColor desc">房屋描述</div>
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          placeholder="请输入房屋描述信息"
          show-word-limit
          class="house-dsc"
          @input="descriptionValue"
        />
      </div>
    </div>
    <van-row class="button-addRoom">
      <van-col span="12"
        ><van-button class="quxiao" type="default" @click="quxiao"
          >取消</van-button
        ></van-col
      >
      <van-dialog
        message="放弃发布房源?"
        confirmButtonText="继续编辑"
        confirmButtonColor="#21b97a"
        v-model="squexiaoShow"
        title="提醒"
        show-cancel-button
        @cancel="cancelFn"
      >
      </van-dialog>
      <van-col span="12">
        <van-button class="queren" type="primary" @click="queren"
          >确认</van-button
        >
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { addRoomApi, addPicApi, addQuerenHouseApi } from '@/api/addroom'
import addRomSelect from '@/components/addRomSelect.vue'
import { mapState } from 'vuex'
// import { mapState } from 'vuex'
export default {
  created () {
    // 获取房屋发布的信息
    this.addRoom()
  },
  data () {
    return {
      squexiaoShow: false,
      // 房屋描述
      message: '',
      // 这是设备记录设备value的值
      result: [],
      // 这是租金
      digit: '',
      // 这是面积
      size: '',
      // 这是房屋标题
      titlt: '',
      roomList: [],
      foolList: [],
      directionList: [],
      fileList: [],
      checked: false,
      changeColor: false,
      houseSheBei: [
        { icon: 'rent-armoire', text: '衣柜', value: '' },
        { icon: 'rent-xiyiji', text: '洗衣机', value: '' },
        { icon: 'rent-kongtiao', text: '空调', value: '' },
        { icon: 'rent-meiqitianranqi', text: '天然气', value: '' },
        { icon: 'rent-bingxiang', text: '冰箱', value: '' },
        { icon: 'rent-shuinuanqigongcheng', text: '暖气', value: '' },
        { icon: 'rent-dianshiji', text: '电视', value: '' },
        { icon: 'rent-haofangtuo400iconfont2reshuiqi', text: '热水器', value: '' },
        { icon: 'rent-wifi', text: '宽带', value: '' },
        { icon: 'rent-shafa', text: '床', value: '' }],
      supportingList: [],
      addRoomData: {
        title: '',
        description: '',
        houseImg: '',
        oriented: '',
        supporting: '',
        price: '',
        roomType: '',
        size: '',
        floor: '',
        community: ''
      }
    }
  },
  methods: {
    // 获取房屋发布的信息
    async addRoom () {
      try {
        const res = await addRoomApi()
        console.log(res)
        this.roomList = res.data.body.roomType
        this.foolList = res.data.body.floor
        this.directionList = res.data.body.oriented
        this.supportingList = res.data.body.supporting
        this.supportingList = res.data.body.supporting
        // 处理一下icon的问题
        this.houseSheBei.forEach(item => {
          console.log(item.value)
          this.supportingList.forEach(ele => {
            if (ele.label === item.text) {
              item.value = ele.value
            }
          })
        })
      } catch (err) {
        console.log(err)
      }
    },
    showPopup () {
      this.show = true
    },
    onConfirm (value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onChange (picker, value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onCancel () {
      this.$toast('取消')
    },
    // 获取房屋类型value
    getRoomTypeValueFn (val) {
      console.log(val)
      this.addRoomData.roomType = val
    },
    // // 获取楼层value
    getFloorValueFn (val) {
      console.log(val)
      this.addRoomData.floor = val
    },
    getDirectionValueFn (val) {
      console.log(val)
      this.addRoomData.oriented = val
    },

    // 获取复选框的数据
    // 上传图片
    async afterRead (file) {
      try {
        // console.log(file)
        const img = new FormData()
        img.append('file', file.file)
        console.log(img)
        const res = await addPicApi(img)
        console.log(res)
        const arr = []
        arr.push(res.data.body[0])
        console.log(arr)
        this.addRoomData.houseImg = arr.join('|')
      } catch (err) {
        // console.log(err)
        this.$toast.fail('图片上传失败')
      }
    },
    // 获取租金的数据
    getPriceValue (val) {
      // console.log(val)
      this.addRoomData.price = val
    },
    // 获取租金的数据
    getSizeValue (val) {
      // console.log(val)
      this.addRoomData.size = val
    },
    // 房屋面熟
    descriptionValue (val) {
      console.log(val)
      // this.addRoomData.description = val
    },
    //  // 发布房子的======================================
    async addQuerenHouse () {
      try {
        console.log(this.addRoomData)
        const res = await addQuerenHouseApi(this.addRoomData)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // 点击取消按钮
    quxiao () {
      this.squexiaoShow = true
    },
    // 确认发起请求
    queren () {
      this.addQuerenHouse()
    },
    cancelFn () {
      this.$router.push('/home')
    }

  },
  computed: {
    ...mapState(['area'])
  },
  watch: {
    area: {
      deep: true,
      immediate: true,
      handler (newval) {
        console.log(newval)
        this.addRoomData.community = newval.community
      }
    },
    result: {
      immediate: true,
      handler (newval) {
        console.log(newval)
        const str = newval.join('|')
        console.log(str)
        this.addRoomData.supporting = str
      }
    },
    // 房屋面熟
    message: {
      immediate: true,
      handler (newval) {
        console.log(newval)
        this.addRoomData.description = newval
      }
    },
    // 标题
    titlt: {
      immediate: true,
      handler (newval) {
        console.log(newval)
        this.addRoomData.title = newval
      }
    }
  },
  filters: {},
  components: {
    addRomSelect
  }
}
</script>

<style scoped lang='less'>
.rent-list {
  .am-list-header {
    padding: 15px 15px 9px;
    color: #21b97a;
    background-color: #fff;
    font-size: 15px;
    line-height: 15px;
    border-bottom: 1px solid #ddd;
  }
  .am-list-item-middle {
    padding-left: 15px;
  }
  // 上传照片的样式
  .van-uploader {
    margin-top: 8px;
  }
}
.textColor {
  color: #333 !important;
}
/deep/ .img-icon {
  height: 20px;
}
.van-checkbox {
  display: flex;
  text-align: center;
  flex-direction: column;
  /deep/span {
    font-size: 23px;
    width: 40px;
    height: 40px;
  }
  /deep/.van-checkbox__label {
    font-size: 14px;
    margin: 0;
    margin-top: 5px;
  }
}
/deep/.van-grid-item__content--center {
  padding: 0;
  padding-top: 10px;
}
/deep/.van-checkbox[data-v-3d1a19c4] span {
  height: 0.8rem;
  width: 60px;
}
.active-color {
  color: #21b97a;
}
.desc {
  margin-top: 15px;
}
/deep/ textarea {
  height: 135px !important;
}
.button-addRoom {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 9999;
  .quxiao {
    width: 100%;
  }
  .queren {
    width: 100%;
  }
}
.checkBocColor {
  color: #21b97a;
}
</style>
