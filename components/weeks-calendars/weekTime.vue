<template>
	<view class="week-box">
		<view class="week-ym">
			<text class="ym-text">{{y}}年</text>
			<text class="ym-text">{{m+1}}月</text>
			<text class="ym-text">周</text>
		</view>
		<view class="week-title">
			<text>一</text><text>二</text><text>三</text><text>四</text><text>五</text><text>六</text><text>日</text>
		</view>
		<view class="week-day" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
			<view class="day-body" :class="dayClass">
				<!-- 删除‘:class="thsDayTime > item.y+item.m+item.d?'active':''"’此代码可关闭禁用状态 -->
				<view class="day" :class="thsDayTime > item.y+item.m+item.d?'active':''" v-for="(item,index) in days" :key="index">
					<text :class="item.sel?'sel':''" @tap="change(item)">{{item.d}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 移动所需参数 */
				startX: 0,
				startY: 0,
				endX: 0,
				endY: 0,
				status: false,
				/* end */
				thsDayTime: '',
				y: '',
				m: '',
				d: '',
				thsDay: '',
				date: '',
				days: [],
				move: true,
				dayClass: ''
			}
		},
		created() {
			this.init(new Date());
			let y = new Date().getFullYear()
			let m = new Date().getMonth() + 1
			let d = new Date().getDate()
			let s = m.toString().length==1?'0'+m.toString():m
			let r = d.toString().length==1?'0'+d.toString():d
			this.thsDayTime = y.toString()+s+r
		},
		methods: {
				/* 监听滑动开始 */
				touchstart(e) {
					e.preventDefault();
					this.startX = e.touches[0].pageX;
					this.startY = e.touches[0].pageY;
				},
				/* 监听滑动移动 */
				touchmove(e) {
					this.status = true;
					this.endX = e.touches[0].pageX;
					this.endY = e.touches[0].pageY;
				},
				/* 监听滑动结束 */
				touchend(e) {
					let X = this.endX - this.startX,
						Y = this.endY - this.startY;
					if (this.status) {
						if (X > 0 && Math.abs(X) > Math.abs(Y)) {
							//向右
							this.prevWeek()
						} else if (X < 0 && Math.abs(X) > Math.abs(Y)) {
							//向左
							this.nextWeek()
						} else if (Y > 0 && Math.abs(Y) > Math.abs(X)) {
							//向下
						} else if (Y < 0 && Math.abs(Y) > Math.abs(X)) {
							//向上
						} else {
							//没有
						}
						this.status = false;
					} else {
						// console.log('没有');
					}
				},
				/* END */
			
			 init(date) {
				// this.thsDay = date.getDate()
				this.thsDay = date.getFullYear()+'-'+this.fill(Number(date.getMonth())+1)+'-'+this.fill(date.getDate())
				this.date = this.format(date)
				this.setDays(date)
			},
			setDays(date) {
				let y = this.y = date.getFullYear(),
					m = this.m = date.getMonth(),
					d = this.d = date.getDate(),
					prevDate = new Date(y, m, d - 7),
					start = this.getWeek1(prevDate);
				this.days = [];
				for (let i = 0; i < 21; ++i) {
					let arr = start.split("-");
					this.days[i] = {
							y: arr[0],
							m: arr[1],
							d: arr[2],
							sel: start == this.thsDay
					};
					start = this.addDate(start, 1);
				}
			},
			change(d) {
				/* 删除此代码可关闭不可点击当前时间之前的功能能 */
				if(this.thsDayTime > d.y+d.m+d.d) {
					uni.showToast({
						title: '预约时间不得小于当天',
						duration: 3000,
						icon: 'none'
					})
					return
				}
				/* END */
				let date = new Date(d.y, d.m - 1, d.d)
				this.init(date);
				this.$emit("back", this.date)
			},
			format(date) {
				let y = date.getFullYear();
				let m = date.getMonth() + 1;
				let d = date.getDate();
				return y + '-' + this.fill(m) + '-' + this.fill(d);
			},
			fill(a) {
				return 10 > a ? '0' + (0 | a) : a
			},
			getWeek(y, m, d) {
				return new Date(y, m, d).getDay();
			},
			getWeek1(date) {
				let nowTime = date.getTime();
				let day = date.getDay() == 0 ? 7 : date.getDay();
				let oneDayLong = 24 * 60 * 60 * 1000;
				let time = nowTime - (day - 1) * oneDayLong;
				let week1 = new Date(time);
				return this.format(week1);
			},
			addDate(date, days) {
				if (days == undefined || days == '') {
					days = 1;
				}
				var date = new Date(date);
				date.setDate(date.getDate() + days);
				let y = date.getFullYear();
				let m = date.getMonth() + 1;
				let d = date.getDate();
				return y + '-' + this.fill(m) + '-' + this.fill(d);
			},
			moveDay(y, m, d) {
				d = d==0?'00':d
				let date = new Date(y, m, d || this.d)
				this.setDays(date);
			},
			prevYear() {
				this.moveDay(this.y - 1, this.m)
			},
			nextYear() {
				this.moveDay(this.y + 1, this.m)
			},
			prevMonth() {
				this.moveDay(this.y, this.m - 1)
			},
			nextMonth() {
				this.moveDay(this.y, this.m + 1)
			},
			prevWeek() {
				if (this.move) {
					this.move = false;
					this.dayClass = "to-left";
					let ths = this;
					setTimeout(function() {
						ths.dayClass = "";
						ths.moveDay(ths.y, ths.m, ths.d - 7)
						ths.move = true;
					}, 1000)
				}
			},
			nextWeek() {
				if (this.move) {
					this.move = false;
					this.dayClass = "to-right";
					let ths = this;
					setTimeout(function() {
						ths.dayClass = "";
						ths.moveDay(ths.y, ths.m, ths.d + 7)
						ths.move = true;
					}, 1000)
				}
			}
		}
	}
</script>

<style>
	/* 周日期样式*/
	.week-box {
		margin: 0 32rpx;
		background: #FFFFFF;
		color: #888;
		font-size: 24rpx;
		box-shadow: 0 0 10rpx #e6e6e6;
		border-radius: 20rpx;
	}

	.week-ym {
		font-size: 30rpx;
		line-height: 72rpx;
		/* border-bottom: 2rpx solid #dadada; */
		text-align: center;
	}

	.week-ym .ym-text {
		/* margin: 0 30upx; */
	}

	.week-ym .i {
		display: inline-block;
		width: 0;
		height: 0;
		border-color: transparent;
		border-style: dashed;
		border-width: 16rpx;
		margin-top: -6rpx;
		vertical-align: middle;
	}

	.week-ym .next-i {
		margin-right: 10rpx;
		border-left-color: #376EF1
	}

	.week-ym .prev-i {
		margin-left: 10rpx;
		border-right-color: #376EF1
	}

	.week-title {
		height: 60rpx;
		line-height: 54rpx;
		color: #999999;
	}

	.week-title text {
		display: inline-block;
		width: 14.28%;
		text-align: center;
	}

	.week-day {
		overflow: hidden;
		position: relative;
		height: 80rpx;
	}

	.week-day .day-body {
		position: absolute;
		width: 300%;
		left: -100%;
	}
	
	.week-day .day {
		text-align: center;
		display: inline-block;
		width: 4.7619%;
		height: 56rpx;
		line-height: 56rpx;
		color: #666666;
		font-size: 32rpx;
		font-weight: 600;
	}
	.week-day .day.active{
		background-color: #e5e5e5;
	}

	.week-day .sel {
		display: inline-block;
		width: 56rpx;
		background: #376EF1;
		border-radius: 50%;
		color: #fff;
	}

	.to-left {
		animation: toLeft 1s ease-in infinite;
	}

	.to-right {
		animation: toRight 1s ease-in infinite;
	}

	@-webkit-keyframes toLeft {
		from {
			left: -100%;
		}

		to {
			left: 0%;
		}
	}

	@-webkit-keyframes toRight {
		from {
			left: -100%;
		}

		to {
			left: -200%;
		}
	}
</style>
