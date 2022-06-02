<template>
	<scroll-view class="page">
		<view class="cu-list menu">
			<view class="cu-item arrow">
				<navigator class='content' url="../feedback/feedback">
					<view class="title">反馈</view>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class='content' url="../fingerprint/fingerprint">
					<view class="title">指纹</view>
				</navigator>
			</view>
		</view>
	</scroll-view>

</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue";
	import cmdResultPage from "@/components/cmd-result-page/cmd-result-page.vue"
	export default {
		data() {
			return {

			}
		},
		components: {
			uniIcon,
			cmdResultPage
		},
		methods: {

		}
	}
</script>

<style>

</style>
