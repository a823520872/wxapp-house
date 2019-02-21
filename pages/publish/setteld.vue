<template>
	<view>
		<view class="cells">
			<view class="cell m_flex">
				<view class="label">姓名：</view>
				<view class="model">
					<input type="text"></input>
				</view>
			</view>
		</view>
		<button class="m_button primary" plain @tap="confirm">提交</button>
	</view>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	methods: {
		...mapActions(['goPage']),
		confirm() {
			this.goPage(`/pages/publish/setteld_succ`);
		}
	}
};
</script>

<style></style>
