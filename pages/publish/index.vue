<template>
	<view>
		<button class="m_button primary" plain @tap="goPage(`/pages/publish/setteld`)">
			入驻村里
		</button>
		<button class="m_button primary" plain @tap="goPage(`/pages/publish/house`)">
			发布房源
		</button>
	</view>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
export default {
	data() {
		return {};
	},
	methods: {
		...mapMutations(['setInitFn']),
		...mapActions(['goPage']),
		getData() {
			this.setInitFn(null)
		}
	}
};
</script>

<style lang="scss"></style>
