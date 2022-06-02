<!-- 用户详情页 -->
<template>
	<view class="container pos-relative" :class="[vtheme]">
		<view class="user-box">
			<view class="user-info bg-box">
				<view class="padding-lr u-padding-top-40 u-padding-bottom-40">
					<view class="flex align-center justify-between ">
						<view>
							<u-icon custom-prefix="custom-icon" class="margin-right-sm"
								:style="{color:userData.sex == '女' ? '#f40' : '#33a7ff'}" :size="32" name="yonghu">
							</u-icon>
							<text class="font-prominent text-bold">{{userData.name ? userData.name : '未命名'}}</text>
							<text class="font-second margin-left-sm">{{userData.duty}}</text>
						</view>
						<view class="flex align-start" @click="changeState" :style="{color: stateColor(userData.state)}">
							<u-icon custom-prefix="custom-icon" class="margin-right-xs" :size="28" name="edit"></u-icon>
							<text class="u-font-13">{{userData.state}}</text>
						</view>
					</view>
					<view class="flex align-center padding-top-xs" v-if="userData.company">
						<u-icon custom-prefix="custom-icon" class="margin-right-sm" :size="28" name="ditu1"></u-icon>
						<text class="font-second">{{userData.company}}</text>
					</view>
					<view class="flex align-center justify-between">
						<view class="flex align-center">
							<u-icon custom-prefix="custom-icon" class="margin-right-xs" :size="36" name="xinxibar_shouji"></u-icon>
							<text class="font-second">{{userData.phone}}</text>
						</view>
						<view class="flex align-center padding-top-xs" v-if="userData.region">
							<u-icon custom-prefix="custom-icon" class="margin-right-sm" :size="28" name="diyu"></u-icon>
							<text class="font-second">{{userData.region}}</text>
						</view>
					</view>
					<view class="flex align-center justify-between">
						<view class="flex align-center" v-if="userData.ipAddr">
							<u-icon custom-prefix="custom-icon" class="u-margin-right-14" :size="34"  name="IPguangchang"></u-icon>
							<text class="font-second">{{userData.ipAddr}}</text>
						</view>
						<view class="flex align-center" v-if="userData.ipRegion">
							<u-icon custom-prefix="custom-icon" class="margin-right-sm" :size="28"  name="ditu"></u-icon>
							<view class="font-second text-cut" style="max-width: 180px;">{{userData.ipRegion}}</view>
						</view>
					</view>
					<view class="tag padding-top-xs flex align-center flex-wrap">
						<u-tag v-for="(item,index) in userData.tag" :key="index" type="warning" class="margin-right-sm"
							:text="item" :closeable="false" size="mini" show />
						<u-tag class="margin-right-sm" text=" + 添加标签" :closeable="false" size="mini" show
							@click="addTag" />
					</view>
					
					<view class="flex padding-top-xs align-center justify-between">
						<view class="flex align-center">
							<block v-if="userData.belong">
								<u-icon custom-prefix="custom-icon" class="u-margin-left-4 u-margin-right-10" :size="26" name="user1"></u-icon>
								<text class="font-second margin-left-xs">{{userData.belong}}</text>
							</block>
						</view>
						<view class="flex align-center">
							<u-icon custom-prefix="custom-icon" class="margin-right-sm" :size="28" name="shijian1"></u-icon>
							<text class="font-second">{{userData.createTime}}</text>
						</view>
					</view>
					
					<view class="flex align-center padding-top-sm" v-if="userData.remark">
						<text class="font-three">备注：</text>
						<text class="font-second">{{userData.remark}}</text>
					</view>
				</view>
				<view class="text-box-line"></view>
			</view>

			<scroll-view scroll-x class="bg-white nav bottom-border">
				<view class="flex">
					<view class="cu-item tab-box" :class="index==current?'text-blue cur':''"
						v-for="(item,index) in tabsList" :key="index" @tap="tabChange(index)" :data-id="index">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
			<swiper class="" :style="{height:scrollHeight}" :current="current" :show-bar="false" :disable-touch="true">
				<swiper-item class="swiper-item tab-content">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<view class="bg-box">
							<view v-if="params.emptyType==0" class="empty">
								<uni-load-more :status="loadingType"></uni-load-more>
							</view>
							<view v-if="params.emptyType==1" class="empty">
								<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
							</view>
							<view v-if="params.emptyType== 2">
								<view v-for="(item,index) in followList" :key="index"
									class="padding-lr border-top padding-tb">
									<view class="flex align-center justify-between">
										<view class="flex align-center">
											<u-icon custom-prefix="custom-icon"
												class="font-three icon-color-main margin-right-sm" name="user"></u-icon>
											<text class="font-three">{{item.creator}}</text>
										</view>
										<view class="flex align-center">
											<text class="font-three">{{item.createTime}}</text>
										</view>
									</view>
									<view class="flex align-center u-padding-top-4">
										<text class="font-second">{{item.remark}}</text>
									</view>
								</view>
								<view class="uni-tab-bar-loading">
									<uni-load-more :status="params.loadingType"></uni-load-more>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item tab-content">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="bg-box border-top">
							<u-form :model="userData" ref="uForm">
								<view class="padding-lr">
									<u-form-item label-width="180" label-position="left" label="详细地址" prop="address"
										:required="false">
										<u-input :border="false" placeholder="/  " v-model="userData.address" type="text"
											input-align="right" disabled></u-input>
									</u-form-item>
									<u-form-item label-width="180" label-position="left" label="座机" prop="telephone"
										:required="false">
										<u-input :border="false" placeholder="/  " v-model="userData.telephone"
											type="text" input-align="right" disabled></u-input>
									</u-form-item>
									<u-form-item label-width="180" label-position="left" label="微信号" prop="weixin"
										:required="false">
										<u-input :border="false" placeholder="/  " v-model="userData.weixin" type="text"
											input-align="right" disabled></u-input>
									</u-form-item>
									<u-form-item label-width="180" label-position="left" label="QQ号" prop="qq"
										:required="false">
										<u-input :border="false" placeholder="/  " v-model="userData.qq" type="number"
											input-align="right" disabled></u-input>
									</u-form-item>
									<u-form-item label-width="180" label-position="left" label="邮箱" prop="email"
										:required="false">
										<u-input :border="false" placeholder="/  " v-model="userData.email" type="text"
											input-align="right" disabled></u-input>
									</u-form-item>
								</view>
							</u-form>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item tab-content">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottomVisit">
						<view class="bg-box">
							<view v-if="paramsVisit.emptyType==0" class="empty">
								<uni-load-more :status="loadingType"></uni-load-more>
							</view>
							<view v-if="paramsVisit.emptyType==1" class="empty">
								<u-empty text="暂无数据" mode="list" icon-size="200"></u-empty>
							</view>
							<view v-if="paramsVisit.emptyType== 2">
								<view v-for="(item,index) in visitList" :key="index"
									class="padding-lr border-top padding-tb">
									<view class="flex align-center">
										<u-icon custom-prefix="custom-icon"
											class="font-three icon-color-main margin-right-sm" name="shijian1"></u-icon>
										<text class="font-second tag-text-second">{{item.createTime}}</text>
									</view>
									<view class="flex align-center justify-between">
										<view class="flex align-center" v-if="item.ipAddress">
											<u-icon custom-prefix="custom-icon" class="font-three icon-color-main margin-right-sm" color="#999999"
												name="IPguangchang"></u-icon>
											<text class="font-three">{{item.ipAddress}}</text>
										</view>
										<view class="flex align-center" v-if="item.ipRegion">
											<u-icon custom-prefix="custom-icon" class="font-three icon-color-main margin-right-sm" color="#999999"
												name="diyu"></u-icon>
											<view class="font-three text-cut" style="max-width: 180px;">{{item.ipRegion}}</view>
										</view>
									</view>
									<view class="flex align-center">
										<text class="font-three">{{item.remark}}</text>
									</view>
								</view>
								<view class="uni-tab-bar-loading">
									<uni-load-more :status="paramsVisit.loadingType"></uni-load-more>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view class="user-btn flex align-center justify-between padding-lr bg-box">
			<view class="user-back flex align-center justify-between">
				<view>
					<u-icon custom-prefix="custom-icon" class="icon-color-main" name="zhuye1" :size="42" color="#303030"
						@click="backToList"></u-icon>
				</view>
				<view class="flex align-center">
					<u-icon custom-prefix="custom-icon" class="icon-color-main" :size="46" color="#303030"
						name="yixianshi-" style="line-height: normal;" @click="editUser"></u-icon>
				</view>
				<view class="text-center flex align-center">
					<u-icon custom-prefix="custom-icon" class="icon-color-main" name="tianjia1" :size="36"
						color="#303030" style="line-height: normal;" @click="editFollow"></u-icon>
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="user-call" @click="call">拨打电话</view>
			<!-- #endif -->
			<view class="user-call"><a style="color: #fff;" :href="`tel:`+phone">拨打电话</a></view>
		</view>

		<!-- 标签 -->
		<u-popup mode="bottom" v-model="showTagPopup" length="100%" border-radius="0" :closeable="true" @touchmove.stop.prevent @touchmove.prevent>
			<view class="content ">
				<scroll-view scroll-y="true" style="height: calc(100vh - 200rpx);">
					<view class="padding-lr padding-top">
						<view v-for="(item,index) in checkboxList" :key="index">
							<view class="flex align-center">
								<text class="cuIcon-titles margin-right-xs" :style="{color:item.color}"></text>
								<view class="font-second padding-tb-sm">{{item.title}}</view>
							</view>
							<view class="flex align-center flex-wrap">
								<u-tag v-for="(child,el) in item.children" :key="el"
									class="margin-right-sm margin-bottom-sm" :text="child.label" :closeable="false"
									:type="child.type" show @click="clickTag(child)"/>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="bottom-btn-appro flex align-center justify-center">
					<view class="cu-botton-submit text-center" @click="formSubmit">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 客户跟进状态 -->
		<u-select mode="single-column" :list="stateList" v-model="showStateSelect" :default-value="selectValue" @confirm="selectStateConfirm"></u-select>
		
		<!-- 添加跟进记录 -->
		<!-- <u-popup mode="bottom" v-model="showRemarkPopup" length="100%" border-radius="0" :closeable="true" @touchmove.stop.prevent @touchmove.prevent>
			<view class="content">
				<view class="u-padding-top-80 padding-lr">
					<view class="flex align-center justify-between padding-bottom" >
						<u-tag class="margin-right-sm" text=" 清空 " :closeable="false" size="mini" show @click="()=>{remark = ''}"/>
					</view>
					<textarea placeholder="请输入跟进记录" placeholder-style="font-size:13px" v-model="remark" class="padding-lr-sm padding-tb-sm border radius"/>
				</view>
				<view class="padding-lr">
					<scroll-view scroll-y="true" style="height: 300px;">
						<view class="padding-lr-xs">
							<view v-for="(item,index) in commonList" :key="index">
								<view class="font-three padding-tb-sm">{{item.title}}</view>
								<view class="flex align-center flex-wrap">
									<u-tag v-for="(child,el) in item.children" :key="el"
										class="margin-right-xs margin-bottom-sm" :text="child.label" :closeable="false"
										:type="child.type" show @click="addCommon(child)"/>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="bottom-btn-appro flex align-center justify-center">
					<view class="cu-botton-submit text-center" @click="formSubmitRemark">确定</view>
				</view>
			</view>
		</u-popup> -->
		<u-popup mode="bottom" v-model="showRemarkPopup" >
			<view class="content">
				<view class="u-padding-top-80 padding-lr">
					<view class="flex align-center justify-between padding-bottom" >
						<u-tag class="margin-right-sm" text=" 常用短语 " :closeable="false" size="mini" show @click="()=>{showCommon = true}"/> 
						<u-tag class="margin-right-sm" text=" 清空 " :closeable="false" size="mini" show @click="()=>{remark = ''}"/>
					</view>
					<textarea placeholder="请输入跟进记录" placeholder-style="font-size:13px" v-model="remark" />
				</view>
				<view class="bottom-btn-appro flex align-center justify-center">
					<view class="cu-botton-submit text-center" @click="formSubmitRemark">确定</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="showCommon" mode="center" border-radius="14" width="95%" :closeable="true" @open="openCommon" @close="closeCommon">
			<view class="u-padding-top-60 paddin-bottom padding-lr-xs">
				<scroll-view scroll-y="true" style="height: 450px;">
					<view class="padding-lr-xs">
						<view v-for="(item,index) in commonList" :key="index">
							<view class="flex align-center">
								<text class="cuIcon-titles margin-right-xs" :style="{color:item.color}"></text>
								<view class="font-second padding-tb-sm">{{item.title}}</view>
							</view>
							<view class="flex align-center flex-wrap">
								<u-tag v-for="(child,el) in item.children" :key="el"
									class="margin-right-xs margin-bottom-sm" :text="child.label" :closeable="false"
									:type="child.type" show @click="addCommon(child)"/>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				userData: {},
				followList: [],
				visitList: [],
				params: {
					pageNo: 1,
					pageSize: 20,
					loadingType: 'loading',
					emptyType: 0,
				},
				paramsVisit: {
					pageNo: 1,
					pageSize: 20,
					loadingType: 'loading',
					emptyType: 0,
				},
				pageNo: 1,
				pageNoVisit: 1,
				pageSize: 20,
				loadingType: 'loading',
				emptyType: 0,
				current: 0,
				tagList:[],
				tabsList: [{
					name: '跟进记录'
				}, {
					name: '联系信息'
				}, {
					name: '访问记录'
				}],
				remark: '',
				scrollHeight: 0,
				showCommon:false,
				showRemarkPopup:false,
				showStateSelect:false,
				selectValue: [],
				showTagPopup:false,
				checkboxList: [{
					title: '客户类型',
					color: '#DF6856',
					children:[{
						label: '国有企业',
						value: '国有企业',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '上市公司',
						value: '上市公司',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '外资企业',
						value: '外资企业',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '大型企业',
						value: '大型企业',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '中小企业',
						value: '中小企业',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '个人客户',
						value: '个人客户',
						checked: false,
						disabled: false,
						type: 'info'
					}]
				},{
					title: '意向程度',
					color: '#5DCBB9',
					children:[{
						label: '意向强烈',
						value: '意向强烈',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '意向较强',
						value: '意向较强',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '意向一般',
						value: '意向一般',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '暂无意向',
						value: '暂无意向',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '无效客户',
						value: '无效客户',
						checked: false,
						disabled: false,
						type: 'info'
					}]
				},{
					title: '客户态度',
					color: '#FBBD08',
					children:[{
						label: '非常热情',
						value: '非常热情',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '比较热情',
						value: '比较热情',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '态度平和',
						value: '态度平和',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '态度冷漠',
						value: '态度冷漠',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '抵触反感',
						value: '抵触反感',
						checked: false,
						disabled: false,
						type: 'info'
					}]
				},{
					title: '沟通情况',
					color: '#53AECE',
					children:[{
						label: '等待回复',
						value: '等待回复',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '需要回访',
						value: '需要回访',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '未接电话',
						value: '未接电话',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '无法接通',
						value: '无法接通',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '直接挂断',
						value: '直接挂断',
						checked: false,
						disabled: false,
						type: 'info'
					},{
						label: '未绑微信',
						value: '未绑微信',
						checked: false,
						disabled: false,
						type: 'info'
					}]
				}],
				stateList: [{
					label: '待沟通',
					value: '待沟通'
				},{
					label: '无需求',
					value: '无需求'
				}, {
					label: '需回访',
					value: '需回访'
				}, {
					label: '跟进中',
					value: '跟进中'
				}, {
					label: '决策中',
					value: '决策中'
				}, {
					label: '洽谈中',
					value: '洽谈中'
				}, {
					label: '已成单',
					value: '已成单'
				}],
				// commonList:[
				// 	{content:'已加微信号，等待通过',checked:false},
				// 	{content:'已通过微信验证，沟通中',checked:false},
				// 	{content:'已发送资料，客户了解中',checked:false},
				// 	{content:'已发报价单',checked:false},
				// 	{content:'已通过电话沟通',checked:false},
				// 	{content:'客户预算x元',checked:false},
				// 	{content:'老客户，已添加过微信',checked:false},
				// 	{content:'对MISBoot Vue版感兴趣',checked:false},
				// 	{content:'对MISBoot TopJUI版感兴趣',checked:false},
				// 	{content:'对TopJUI前端框架感兴趣',checked:false}
				// ]
				commonList:[
					{
						title: '客户沟通',
						color: '#DF6856',
						children:[{
							label: '已添加微信号，等待通过',
							value: '已添加微信号，等待通过',
							checked: false,
							disabled: false,
							type: 'info'
						},{
							label: '已通过微信验证，沟通中',
							value: '已通过微信验证，沟通中',
							checked: false,
							disabled: false,
							type: 'info'
						},{
							label: '第二个微信号跟进',
							value: '第二个微信号跟进',
							checked: false,
							disabled: false,
							type: 'info'
						},{
							label: '第三个微信号跟进',
							value: '第三个微信号跟进',
							checked: false,
							disabled: false,
							type: 'info'
						},{
							label: '已通过电话沟通',
							value: '已通过电话沟通',
							checked: false,
							disabled: false,
							type: 'info'
						},{
							label: '客户了解中',
							value: '客户了解中',
							checked: false,
							disabled: false,
							type: 'info'
						},{
							label: '老客户，已添加过微信',
							value: '老客户，已添加过微信',
							checked: false,
							disabled: false,
							type: 'info'
						}]
					},
					{
						title: '产品意向',
						color: '#5DCBB9',
						children:[{
							label: '客户需要定制开发系统',
							value: '客户需要定制开发系统',
							checked: false,
							disabled: false,
							type: 'info'
						},{
							label: '对MISBoot Vue版感兴趣',
							value: '对MISBoot Vue版感兴趣',
							checked: false,
							disabled: false,
							type: 'info'
						},{
							label: '对MISBoot TopJUI版感兴趣',
							value: '对MISBoot TopJUI版感兴趣',
							checked: false,
							disabled: false,
							type: 'info'
						},{
							label: '对TopJUI前端框架感兴趣',
							value: '对TopJUI前端框架感兴趣',
							checked: false,
							disabled: false,
							type: 'info'
						},{
							label: '对自动化运维平台感兴趣',
							value: '对自动化运维平台感兴趣',
							checked: false,
							disabled: false,
							type: 'info'
						}]
					},
					{
						title: '预算成交',
						color: '#FBBD08',
						children:[{
							label: '客户预算为X元',
							value: '客户预算为X元',
							checked: false,
							disabled: false,
							type: 'info'
						},{
							label: '客户等待购买时机',
							value: '客户等待购买时机',
							checked: false,
							disabled: false,
							type: 'info'
						},{
							label: '客户已成交',
							value: '客户已成交',
							checked: false,
							disabled: false,
							type: 'info'
						}]
					},
					{
						title: '文档资料',
						color: '#53AECE',
						children:[{
							label: '已发送相关资料',
							value: '已发送相关资料',
							checked: false,
							disabled: false,
							type: 'info'
						},{
							label: '已发送报价单',
							value: '已发送报价单',
							checked: false,
							disabled: false,
							type: 'info'
						},{
							label: '已发送合同给客户',
							value: '已发送合同给客户',
							checked: false,
							disabled: false,
							type: 'info'
						}]
					}
				]
			}
		},
		onLoad(o) {
			this.phone = o.phone
			this.getData()
			this.getFollowData()
		},
		methods: {
			formSubmitRemark(){
				var that = this
				if(!that.remark){
					that.$u.toast('请输入备注')
				} else {
					let params = {
						phone: that.phone,
						remark: that.remark
					}
					that.$http
						.post('/office/crmCustomerTrack/save', params, {
							params: {},
						})
						.then(res => {
							that.$u.toast(res.data.message)
							if(res.data.statusCode == 200){
								that.pageNo = 1
								that.loadingType = 'loading'
								that.followList = []
								that.getData()
								that.getFollowData()
							}
						})
						.catch(err => {});
						that.showRemarkPopup = false
				}
			},
			formSubmit(){
				var that = this
				that.checkTag()
				that.$nextTick(function(){
					let data = {
						tag: that.tagList
					}
					that.updateData(data)
					that.showTagPopup = false
				})
			},
			openCommon(){
				this.commonList.forEach(val => {
					val.children.forEach(e=>{
						e.checked = false
						e.type = 'info'
					})
				})
				this.$nextTick(function(){
					this.showCommon = true
				})
			},
			closeCommon(){
				this.commonList.forEach(val => {
					val.children.forEach(e=>{
						if(e.checked){
							if(!this.remark){
								this.remark += e.value
							} else {
								this.remark +=  '，' + e.value
							}
						}
					})
				})
			},
			addCommon(item){
				item.checked = !item.checked
				item.type = item.checked ? 'primary' : 'info'
			},
			addTag(){
				this.checkboxList.forEach(val => {
					val.children.forEach(e=>{
						if(this.tagList.includes(e.value)){
							e.checked = true
							e.type = 'warning'
						}
					})
				})
				this.$forceUpdate()
				this.showTagPopup = true
			},
			clickTag(item){
				item.checked = !item.checked
				item.type = item.checked ? 'warning' : 'info'
			},
			checkTag(){
				let tag = []
				this.checkboxList.forEach(val=>{
					val.children.forEach(e=>{
						if(e.checked){
							tag.push(e.value)
						}
					})
				})
				console.log("tag",tag)
				this.tagList = tag
			},
			changeState(){
				this.showStateSelect = true
			},
			selectStateConfirm(e){
				console.log(e)
				let data = {
					state : e[0].value
				}
				this.updateData(data)
				this.showStateSelect = false
			},
			updateData(data){
				var that = this
				let params = {
					...data,
					uuid: that.userData.uuid,
				}
				that.$http
					.post('/office/crmCustomer/update', params, {
						params: {},
					})
					.then(res => {
						that.$u.toast(res.data.message)
						if(res.data.statusCode == 200){
							that.getData()
						}
					})
					.catch(err => {});
			},
			tabChange(e) {
				console.log("e---", e)
				this.current = e
				if (e == 0 && this.followList.length == 0) {
					this.params = {
						pageNo: 1,
						pageSize: 20,
						loadingType: 'loading',
						emptyType: 0
					}
					this.getFollowData()
				} else if (e == 2 && this.visitList.length == 0) {
					this.paramsVisit = {
						pageNo: 1,
						pageSize: 20,
						loadingType: 'loading',
						emptyType: 0
					}
					this.getVisitData()
				}
			},
			refshList(type) {
				if (type == 'edit') {
					this.getData()
				} else {
					this.pageNo = 1
					this.loadingType = 'loading'
					this.followList = []
					this.getData()
					this.getFollowData()
				}
			},
			onreachBottom() {
				console.log("触底加载")
				if (this.loadingType == 'more') {
					this.getFollowData()
				}
			},
			getData() {
				let that = this
				that.selectValue = []
				that.$http
					.post('/office/crmCustomer/getDetailByPhone', {
						phone: that.phone
					}, {
						params: {},
					})
					.then(res => {
						if (res.statusCode == 200) {
							that.userData = res.data[0]
							that.userData.tag = that.isNull(res.data[0].tag) ? '' : res.data[0].tag.split(',')
							that.tagList = that.userData.tag
							
							let state = that.userData.state
							that.stateList.forEach((e,index)=>{
								if(e.value == state){
									that.selectValue.push(index)
								}
							})
							console.log("selectValue",this.selectValue)
							
							let data = {
								phone: that.userData.phone,
								tag : that.userData.tag,
								state : that.userData.state
							}
							uni.setStorage({
								key: 'crmData',
								data: data
							})
							
							that.$nextTick(function() {
								let userInfoHeight = ''
								let navHeight = ''
								that.$u.getRect('.user-info').then(res => {
									userInfoHeight = res.height + 'px'
									console.log(userInfoHeight)
								})
								that.$u.getRect('.nav').then(res => {
									navHeight = res.height + 'px'
									console.log(navHeight)
								})
								that.$nextTick(function() {
									console.log("userInfoHeight", userInfoHeight, 'navHeight',
										navHeight)
									that.scrollHeight = `calc(100vh - ` + userInfoHeight + ` - ` +
										navHeight + ` - 88rpx )`
								})
							})
						}
					})
					.catch(err => {});
			},
			getFollowData() {
				let that = this
				let params = {
					pageNo: that.params.pageNo,
					pageSize: that.params.pageSize,
					phone: that.phone
				}
				that.$http
					.post('/office/crmCustomerTrack/getPageSetByPhone', params, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						that.params.pageNo++
						that.followList = that.followList.concat(list);
						that.params.emptyType = 2
						if (that.followList.length == 0) {
							that.params.loadingType = 'nomore'
							that.params.emptyType = 1
						} else {
							if (that.params.pageNo > res.data.totalPage) {
								that.params.loadingType = 'nomore';
							} else {
								that.params.loadingType = 'more';
							}
						}
						console.log("index---", that.followList)
					})
					.catch(err => {});
			},
			onreachBottom() {
				console.log("触底加载")
				if (this.params.loadingType == 'more') {
					this.getFollowData()
				}
			},
			getVisitData() {
				let that = this
				let params = {
					pageNo: that.paramsVisit.pageNo,
					pageSize: that.paramsVisit.pageSize,
					phone: that.phone
				}
				that.$http
					.post('/office/crmCustomerVerification/getPageSetByPhone', params, {
						params: {},
					})
					.then(res => {
						let list = res.data.rows;
						that.paramsVisit.pageNo++
						that.visitList = that.visitList.concat(list);
						that.paramsVisit.emptyType = 2
						if (that.visitList.length == 0) {
							that.paramsVisit.loadingType = 'nomore'
							that.paramsVisit.emptyType = 1
						} else {
							if (that.paramsVisit.pageNo > res.data.totalPage) {
								that.paramsVisit.loadingType = 'nomore';
							} else {
								that.paramsVisit.loadingType = 'more';
							}
						}
						console.log("index---", that.visitList)
					})
					.catch(err => {});
			},
			onreachBottomVisit() {
				console.log("触底加载22")
				if (this.paramsVisit.loadingType == 'more') {
					this.getVisitData()
				}
			},
			backToList() {
				uni.navigateTo({
					url: './index'
				})
			},
			editUser() {
				console.log(this.phone)
				uni.navigateTo({
					url: './edit?phone=' + this.phone
				})
			},
			editFollow() {
				this.remark = ''
				this.showRemarkPopup = true
				// uni.navigateTo({
				// 	url: './followUp?phone=' + this.phone
				// })
			},
			call() {
				if (this.phone) {
					uni.makePhoneCall({
						phoneNumber: this.phone
					});
				} else {
					this.$u.toast('联系电话为空')
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* tag标签 */
	/deep/.u-size-mini{
		padding: 0 6px !important;
		height: 18px;
		line-height: 18px !important;
		display: flex; 
		align-items: center;
	}
	/deep/.u-size-default{
		height: 26px;
		line-height: 26px !important;
		padding: 0 12px !important;
		display: flex;
		align-items: center;
	}
	/deep/uni-textarea{
		width: 100%;
		font-size: 14px;
	}
	.user-box {
		width: 100vw;
		height: calc(100vh - 44px);
	}

	.tab-box {
		width: 50px;
		font-size: 13px;
	}

	.swiper-box {
		height: calc(100vh - 44px);
	}

	.user-btn {
		width: 100%;
		height: 44px;
		position: absolute;
		// bottom: env(safe-area-inset-bottom);
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 5;
	}

	.user-back {
		width: 40%;
	}

	.user-call {
		width: 50%;
		height: 36px;
		line-height: 36px;
		border-radius: 36px;
		background-color: #F43530;
		color: #fff;
		font-size: 14px;
		text-align: center;
	}
</style>
