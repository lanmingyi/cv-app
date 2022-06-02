<template>
  <view id="select">
    <select v-model="selected" autofocus v-if="provinceL">
      <option disabled value="请选择城市">请选择城市</option>
      <option v-for="(item,index) in provinceL" :value="item">{{item.name}}</option>
    </select>
    <select v-model="citySelected" v-if="cityL">
      <option disabled value="请选择城市">请选择城市</option>
      <option v-for="(item,index) in cityL" :value="item">{{item.name}}</option>
    </select>
    <select v-model="areaSelected" v-if="areaL">
      <option disabled value="请选择城市">请选择区县</option>
      <option v-for="(item,index) in areaL" :value="item">{{item.name}}</option>
    </select>
  </view>
</template>

<script>

import { province, city, area } from '@/common/vue-area.js'
export default {

  data() {
    return {
      selected: {
        code: 110000,
        name: '北京市',
        parentId: 0
      },
      citySelected: {},
      areaSelected: {},
      provinceL: [],
      cityL: [],
      areaL: [],
    }
  },
  watch: {
    selected: function () {
      console.log(this.selected)
      // 清除区县
      this.citySelected = {}
      this.cityL = city.filter((item) => item.parentId === this.selected.code)
    },
    citySelected: function () {
      console.log(this.citySelected)
      this.areaL = area.filter((item) => item.parentId === this.citySelected.code)
    }
  },
  components: {
    // vueArea: vueArea
  },
  methods: {
  },
  created() {
    console.log(province)
    this.provinceL = [...province]
  }
}
</script>

<style lang="scss">
#select {
	width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60upx;
  display: flex;
  justify-content: space-around;
}
select {
  width: 30%;
  height: 60upx;
}
</style>