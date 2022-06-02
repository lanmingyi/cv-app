import userPopup from './userPopup.vue'
import userTree from './userTree.vue'
import deptPopup from './deptPopup.vue'
import deptTree from './deptTree.vue'
import dictSelect from './dictSelect.vue'
import dropdownBox from './dropdownBox.vue'
import pickerSelect from './pickerSelect.vue'
import timeRankSelect from './timeRankSelect.vue'
import Ttable from './Ttable.vue'
import TtableFixed from './TtableFixed.vue'
import Tupload from './Tupload.vue'
import cuCustom from './cu-custom.vue'
export default {
	install(Vue) {
		Vue.component(userPopup.name,userPopup)
		Vue.component(userTree.name,userTree)
		Vue.component(deptPopup.name,deptPopup)
		Vue.component(deptTree.name,deptTree)
		Vue.component(dictSelect.name,dictSelect)
		Vue.component(dropdownBox.name,dropdownBox)
		Vue.component(pickerSelect.name,pickerSelect)
		Vue.component(timeRankSelect.name,timeRankSelect)
		Vue.component(Ttable.name,Ttable)
		Vue.component(TtableFixed.name,TtableFixed)
		Vue.component(Tupload.name,Tupload)
		Vue.component(cuCustom.name,cuCustom)
	}
}
