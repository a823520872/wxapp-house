<template>
	<view class="content"><house-list :list.sync="list"></house-list></view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import HouseList from '../components/house-list';
export default {
	components: {
		HouseList
	},
	data() {
		return {
			list: [1, 2]
		};
	},
	onLoad(res) {
		console.log('onLoad');
	},
	onPullDownRefresh() {
		console.log('onPullDownRefresh');
	},
	onReachBottom() {
		console.log('onReachBottom');
	},
	onReady() {
		this.setInitFn(this.getData);
	},
	methods: {
		...mapMutations(['setInitFn']),
		getData() {
			console.log('init');
			this.setInitFn(null);
		}
	}
};
</script>

<style lang="scss"></style>
