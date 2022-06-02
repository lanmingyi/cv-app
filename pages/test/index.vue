<template>
    <view>
				<web-view :webview-styles="webviewStyles" src="http://192.168.1.112:8080/#/?key=cni23011784"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        }
    }
</script>

<style>

</style>