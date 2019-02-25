<template>
	<view>
		<view class="cells">
			<view class="cell m_flex">
				<view class="label">姓名：</view>
				<view class="model"><input type="text" /></view>
			</view>
			<view class="cell m_flex">
				<view class="label">手机号：</view>
				<view class="model">
					<input type="number" />
				</view>
			</view>
		</view>
		<button class="m_button primary" plain @tap="confirm">提交</button>
	</view>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	data() {
		return {
			form: {
				name: '',
				phone: '',
				num: '',
				province: '',
				city: '',
				contry: '',
				recommender: ''
			}
		};
	},
	methods: {
		...mapActions(['goPage']),
		confirm() {
			this.goPage(`/pages/publish/setteld_succ`);
		}
	}
};
</script>

<style></style>
