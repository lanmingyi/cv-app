<template>
	<view id="page">
		<view class="lottery-draw-banner">
			<image src='https://staticimgs.oss-cn-beijing.aliyuncs.com/choujiang-banner.png' mode='widthFix'></image>
		</view>
		<view class='lottery-draw-msg'>
			<graceSpeaker :icon="speakerIconImg" :msgs="speakerMsgs"></graceSpeaker>
		</view>
		<view class='lottery-draw-main-bg'>
			<view class='lottery-draw-main'>
				<block v-for="(item, index) in prizes" :key="index">
					<view :class="['items', animateIndex == index ? 'animate' : '']" v-if="index != 4">
						<view class='img'><image :src='item.imgurl' mode='widthFix'></image></view>
						<view class='name'>{{item.title}}</view>
					</view>
					<view :class="['items','btn', animateStatus == 'ing' ? 'breath_light' : '']" v-if="index == 4" @tap='go'>
						{{item.title}}
					</view>
				</block>
			</view>
		</view>
		<view class="grace-title" style="margin-top:20px;">
			<view class="grace-h5 grace-blod text-center" style='color:#FC5566;'>- 活动说明 -</view>
			<view class="grace-text-small text-center" style='color:#FFF;'>活动有效期 : 2019-01-01 至 2019-12-30</view>
		</view>
		<view class='grace-text text-center' style='color:#FFF;'>
			活动说明文字内容...
		</view>
	</view>
</template>
<script>
var _self, animateTimer;
import graceSpeaker from "@/graceUI/components/graceSpeaker.vue";
export default {
	data() {
		return {
			// 中奖滚动
			speakerIconImg:'https://staticimgs.oss-cn-beijing.aliyuncs.com/speaker.png',
			speakerMsgs: [
			  { title: "用户 *** 刚刚抽中一台 iphoneX", url: "", opentype: "navigate" },
			  { title: "用户 *** 刚刚抽中跑鞋", url: "", opentype: "navigate" }
			],
			// 奖品及按钮
			prizes : [
			  { title: 'iphoneX', 'imgurl': "https://img.alicdn.com/bao/uploaded/i1/809107100/TB2giNsX0LO8KJjSZPcXXaV0FXa_!!809107100.jpg" },
			  { title: '小米3', 'imgurl': "https://img.alicdn.com/bao/uploaded/i4/1714128138/O1CN015ZGeGj29zFfjpg41N_!!1714128138.jpg" },
			  { title: '记录仪', 'imgurl': "https://img.alicdn.com/bao/uploaded/i4/2631451752/O1CN01IyRW2w1OoSNvglF0E_!!2631451752.jpg" },
			  { title: '腾讯视频会员', 'imgurl': "https://img.alicdn.com/bao/uploaded/i4/2966815968/O1CN01DRE0eb1txOC21pZDc_!!0-item_pic.jpg" },
			  { title: 'GO', 'imgurl': "" },
			  { title: '小米手环', 'imgurl': "https://img.alicdn.com/bao/uploaded/i1/1099051825/TB2gMRodgHqK1RjSZFEXXcGMXXa_!!1099051825.jpg" },
			  { title: '跑鞋', 'imgurl': "https://img.alicdn.com/bao/uploaded/i1/890482188/O1CN01vzTaOr1S294ocZqkG_!!0-item_pic.jpg" },
			  { title: '台灯', 'imgurl': "https://img.alicdn.com/bao/uploaded/i3/2616970884/O1CN016tVSDi1IOubrk1Tjl_!!2616970884.jpg" },
			  { title: '谢谢参与', 'imgurl': "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3225805949,731297870&fm=26&gp=0.jpg" },
			],
			// 转圈 index
			turnIndex : 0,
			// 动画 index
			animateIndex : -1,
			// 动画 执行状态 stop 停止 ing 执行中 end 结束
			animateStatus : 'stop' 
		};
	},
	components:{
		graceSpeaker
	},
	onLoad: function (options) {
		_self = this;
	},
	methods:{
		// 抽奖动画
		go : function(){
			// 用户如果已经抽过奖或者不满足条件这里使用 return 返回，终止程序运行
			// your code ...

			// 判断是否正在执行动画
			if (this.animateStatus != 'stop'){return false;}
			this.animateStatus = 'ing';

			// 此处根据自己的业务决定抽奖结果[ 算法可以是后端或前端 自行百度根据自己概率做算法 ]

			// 比如模拟一个随机 0 - 8 数字[ 中奖率极高 ]
			var num = Math.floor(Math.random() * 8);
			// 不能抽中按钮所以抽中按钮等没中奖
			if(num == 4){num = 8;}
			// num 代表奖品的 index 应该使用自己的算法得出
			
			// 动画
			this.animate(num);
		  },
		  animate:function(num){
			//执行动画 100 代表动画切换时间可以调整动画速度
			this.turnIndex    = 0;
			this.animateIndex = 0;
			animateTimer = setInterval(function () {
			  _self.turn(num);
			}, 100);
		  },
		  turn : function(num){
			var orders = [0, 1, 2, 5, 8, 7, 6, 3]; //奖品序号
			var turnNumForPrizes = 0; //奖品的位置
			for(var i = 0; i < orders.length; i++){
			  if (orders[i] == num){
				turnNumForPrizes = i;
				break;
			  }
			}
			var turnNum = 3; //此处设置预先转几圈
			if (this.turnIndex >= 8 * turnNum + turnNumForPrizes){
			  clearInterval(animateTimer) ; 
			  // 动画结束 此处可以进行后续操作
			  this.animateStatus = 'stop'; // 可以继续抽奖
			  // this.animateStatus = 'end'; // 这样写就可以结束抽奖

			  if(num == 8){
				uni.showToast({
				  title: '感谢参与 ^_^',
				  icon:"none"
				});
			  }else{
				uni.showToast({
				  title: '恭喜您！抽中了 : ' + this.prizes[num].title,
				  icon: "none"
				});
			  }
			  // your code ...
			  return ;
			}
			this.turnIndex++;
			var animateIndex  = this.turnIndex % 8;
			this.animateIndex = orders[animateIndex];
		  }
	}
}
</script>
<style>

page{background:#FFD800;}
.lottery-draw-banner{width:100%;}
.lottery-draw-banner image{width:100%;}
.lottery-draw-msg{width:80%; border:2px solid #FC5566; border-radius:50px;color:#E81B54; display: flex; align-items: center; justify-content: center; background:rgba(255, 255,255, 0.8); margin:0 auto; margin-top:15px; padding-left:15px; height: 100upx; overflow:hidden;}
.lottery-draw-main-bg{width:600upx; height:600upx; padding:15px; border-radius:10px; margin:0 auto; margin-top:20px; background:#FC5566;}
.lottery-draw-main{width:570upx; height:570upx; padding:12upx; background:#E81B54; border-radius:8px; display:flex; flex-wrap:wrap; justify-content:center;}
.lottery-draw-main .items{width:163upx; height:163upx; background:rgba(255,255,255, 1); margin:5upx; border-radius:5upx; border:8upx solid #FFF; overflow:hidden;}
.lottery-draw-main .btn{background:#FFB001; border-color:#FFB001; color:#AB6120; text-align:center; line-height:163upx; font-weight:700; font-size:24px;}
.lottery-draw-main .items .img{width:100upx; height:100upx; margin:8upx auto; overflow:hidden;}
.lottery-draw-main .items .img image{width:100%;}
.lottery-draw-main .items .name{line-height:40upx; height:40upx; overflow:hidden; text-align:center; color:#AB6120; font-size:12px;}
.lottery-draw-main .animate{border-color:#FFD800 !important;}


@keyframes breath {
    from { opacity: 1; }
    75%  { opacity: 0.9; } 
    50%  { opacity: 0.8; }
    25%  { opacity: 0.9; }
    to   { opacity: 1; }   
}
.breath_light{animation:breath 1s infinite linear;}
</style>
