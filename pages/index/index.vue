<template>
	<view class="content">
		index
	</view>
</template>

<script>
	import { mapState, mapMutations, mapActions } from 'vuex'
	export default {
		// computed: {
		// 	...mapState(['userInfo'])
		// },
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			console.log('index');
		},
		onShow() {

		},
		onReady() {
			this.setInitFn(this.getData)
		},
		methods: {
			...mapMutations(['setInitFn']),
			getData() {
				console.log('init');
				this.setInitFn(null)
			}
		}
	}
</script>

<style lang="scss">
</style>
