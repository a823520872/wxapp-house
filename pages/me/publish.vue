<template>
	<view>
		<view class="tabs m_flex">
			<view class="m_flex_item"><view class="tab">空房（发布中）</view></view>
			<view class="m_flex_item"><view class="tab">已租（未发布）</view></view>
		</view>
		<publish-list></publish-list>
	</view>
</template>

<script>
import publishList from '../components/publish-list.vue';
export default {
	components: {
		publishList
	},
	onLoad(res) {
		console.log('onLoad');
	},
	onReady() {
		console.log('onReady');
	},
	onPullDownRefresh() {
		console.log('onPullDownRefresh');
	},
	onReachBottom() {
		console.log('onReachBottom');
	}
};
</script>

<style lang="scss" scoped>
.tabs {
	text-align: center;
	.tab {
		
	}
}
</style>
