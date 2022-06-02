<template>
	<view class="container" :class="[vtheme]">
		<view class="check-box bg-box margin-xl">
			<view class="flex align-center justify-center">
				<view class="bg-gray radius check-time-box margin-sm  padding-lr-sm padding-top-sm padding-bottom-xs ">
					<view class="line-hight-min">上班09:00</view>
					<view class="flex align-center line-hight-min">
						<view class="cuIcon-roundcheck text-green margin-right-xs"></view>
						<view class="  text-black">08:45已打卡</view>
					</view>
				</view>
				<view class="bg-gray radius check-time-box margin-sm padding-lr-sm padding-top-sm padding-bottom-xs">
					<view class="line-hight-min">下班18:30</view>
					<view class="flex align-center line-hight-min">
						<view></view>
						<view class="  text-grey">未打卡</view>
					</view>
				</view>
			</view>
			
			<view class="check-clock bg-blue round flex align-center justify-center">
				<view class="text-center" @click="onClock">
					<view class="text-xl">下班打卡</view>
					<view>{{time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {  
				journalData: {},
				time:''
			};
		},
		onLoad() {
			this.getTime()
			setInterval(() => {
			  this.getTime();
			}, 1000);
		},
		onPullDownRefresh() {
		},
		methods: {
			onClock(){
				console.log("this.time----",this.time)
				let tips = '还未到下班时间'
				uni.showToast({
					icon: 'none',
					title: tips
				})
			},
			getTime () {
			  this.time = this.dateFormat(new Date());
			},
			dateFormat(date) {
					// let format = 'yyyy-MM-dd hh:mm:ss';
			    let format = 'hh:mm:ss';
			    if (date != 'Invalid Date') {
			        var o = {
			            "M+": date.getMonth() + 1, //month
			            "d+": date.getDate(), //day
			            "h+": date.getHours(), //hour
			            "m+": date.getMinutes(), //minute
			            "s+": date.getSeconds(), //second
			            "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
			            "S": date.getMilliseconds() //millisecond
			        }
			        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
			            (date.getFullYear() + "").substr(4 - RegExp.$1.length));
			        for (var k in o)
			            if (new RegExp("(" + k + ")").test(format))
			                format = format.replace(RegExp.$1,
			                    RegExp.$1.length == 1 ? o[k] :
			                        ("00" + o[k]).substr(("" + o[k]).length));
			        return format;
			    }
			    return '';
			
			}
		}
	};
</script>

<style lang="scss" scoped>
.check-box{
	border-radius: 25rpx;
	min-height: 500rpx;
	padding-bottom: 150rpx;
	.line-hight-min{
		line-height: 30rpx;
	}
	.check-time-box{
		width: 40%;
		border-radius: 20rpx;
	}
	.check-clock{
		width: 250rpx;
		height: 250rpx;
		margin: 100rpx auto 0;
	}
}
</style>
