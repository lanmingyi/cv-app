<template>
	<view style="width: 100%;background-color: #fff;">
		<view class="text-center padding-tb"></view>
		<Ttable-fixed 
			:columns="columns"
			:loadData="loadData"
			columnBgColor="#99ccff"
			:fontSize="26"
			:scroll="{x: 'auto',y: '300px'}">
			<template v-slot:serial="{text, record, index }">
				<text>{{ index + 1 }}</text>
			</template>
			<template v-slot:sex="{text, record }">
				<text>{{text == 0 ? '女' : '男'}}</text>
			</template>
			<template v-slot:action="{text, record }">
				<text class="flex align-center justify-around font-second">
					<text @click="handleEdit(record)">编辑</text>
					<!-- <text @click="handleDel(record)">删除</text> -->
				</text>
			</template>
		</Ttable-fixed>
		
		<edit-popup ref="editPopup" :mdl="mdl" :show="showPop" @cancel="()=>{showPop=false}" @ok="handleOk"></edit-popup>
		
	</view>
</template>

<script>
	import editPopup from './edit.vue'
	export default {
		components:{editPopup},
		data() {
			return {
				showPop:false,
				mdl: {},
				columns:[{
					title: '#',
					dataIndex: 'serial',
					scope:true,
					width: '50px',
					fixed:'left'
				},{
					title: '姓名',
					dataIndex: 'name',
					width: '100px',
				},{
					title: '性别',
					dataIndex: 'sex',
					width: '100px',
					scope:true
				},{
					title: '年龄',
					dataIndex: 'age',
					width: '100px'
				},{
					title: 'uuid',
					dataIndex: 'uuid',
					width: '100px'
				},{
					title: '操作',
					dataIndex: 'action',
					fixed: 'right',
					width: '50px',
					scope:true
				}],
				loadData:[{
					title: '一',
					name: '张一张一张一张一张一张一',
					sex: 0,
					age: 22,
					uuid: 1
				},{
					title: '二',
					name: '张二',
					sex: 1,
					age: 18,
					uuid: 2
				},{
					title: '一',
					name: '张一张一张一张一张一张一',
					sex: 0,
					age: 22,
					uuid: 1
				},{
					title: '二',
					name: '张二',
					sex: 1,
					age: 18,
					uuid: 2
				},{
					title: '一',
					name: '张一张一张一张一张一张一',
					sex: 0,
					age: 22,
					uuid: 1
				},{
					title: '二',
					name: '张二',
					sex: 1,
					age: 18,
					uuid: 2
				},{
					title: '一',
					name: '张一张一张一张一张一张一',
					sex: 0,
					age: 22,
					uuid: 1
				},{
					title: '二',
					name: '张二',
					sex: 1,
					age: 18,
					uuid: 2
				},{
					title: '一',
					name: '张一张一张一张一张一张一',
					sex: 0,
					age: 22,
					uuid: 1
				},{
					title: '二',
					name: '张二',
					sex: 1,
					age: 18,
					uuid: 2
				}]
			};
		},
		methods:{
			handleEdit(record){
				this.mdl = record
				this.$refs.editPopup.onLoadData(record)
				this.showPop = true
			},
			handleOk(record){
				console.log("record",record)
				this.showPop = false
				if(record.uuid){
					this.loadData.map(val=>{
						if(val.uuid == record.uuid){
							val = record
						}
					})
					console.log('123',this.loadData)
					this.$u.toast(`更新成功`)
				} else {
					this.loadData.push(record)
					this.$u.toast(`添加成功`)
				}
				console.log(this.loadData)
			},
			handleDel(record){
				console.log("record",record)
				this.$u.toast(`删除`+ record.name +`了！`)
			},
		}
	}
</script>

<style lang="scss">

</style>
