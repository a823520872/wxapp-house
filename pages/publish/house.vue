<template>
	<view>
		房源信息
		<button class="m_button primary" plain @tap="confirm">确认发布</button>
	</view>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	methods: {
		...mapActions(['goPage']),
		confirm() {
			this.goPage(`/pages/publish/publish_succ`);
		}
	}
};
</script>

<style></style>
