<template>
	<view class="ui-mask" @tap.stop="hide"></view>
</template>

<script>
	export default {
		methods: {
			hide() {
				this.$emit('click', false)
			}
		}
	}
</script>

<style lang="scss">
	.ui-mask {
		position: fixed;
		z-index: 100;
		top: var(--window-top);
		right: 0;
		left: 0;
		bottom: 0;
		background: $uni-bg-color-mask;
	}
</style>
