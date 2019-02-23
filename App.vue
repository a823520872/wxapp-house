<script>
import { mapState, mapActions } from 'vuex';
export default {
	computed: {
		...mapState(['initFn'])
	},
	onLaunch: function() {
		if (wx.canIUse && wx.canIUse('getUpdateManager')) {
			let updateManager = wx.getUpdateManager();
			updateManager.onUpdateReady(function() {
				updateManager.applyUpdate();
			});
		}
	},
	onShow: function() {
		console.log('App Show');
		this.init();
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		...mapActions(['login']),
		init() {
			const vm = this;
			this.check({
				success() {
					console.log('已登录');
					vm.initFn && vm.initFn();
				},
				fail() {
					vm.login.then(res => {
						
					}, e => {
						
					}).catch(e => console.log(e))
				}
			});
		},
		check(o) {
			uni.checkSession({
				success: o.success,
				fail: o.fail
			});
		},
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
page {
	background-color: $uni-bg-color-grey;
}
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
button,
p,
blockquote,
th,
td {
	margin: 0;
	padding: 0;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.content {
	font-size: 32upx;
	color: $uni-text-color;
}
.m_flex {
	display: flex;
}
.m_flex_left {
	display: flex;
	justify-content: flex-start;
}
.m_flex_center {
	display: flex;
	justify-content: center;
}
.m_flex_right {
	display: flex;
	justify-content: flex-end;
}
.m_flex_justify {
	display: flex;
	justify-content: space-between;
}
.m_flex_top {
	display: flex;
	align-items: flex-start;
}
.m_flex_middle {
	display: flex;
	align-items: center;
}
.m_flex_bottom {
	display: flex;
	align-items: flex-end;
}
.m_flex_column {
	display: flex;
	flex-direction: column;
}
.m_flex_wrap {
	display: flex;
	flex-wrap: wrap;
}
.m_flex_item {
	flex: 1;
}
.m_button {
	display: inline-block;
	padding: 10upx 14upx;
	font-size: 28upx;
	line-height: 1;
	box-sizing: border-box;

	&[type='primary'] {
		color: $uni-color-success;
	}

	&.primary {
		background-color: $uni-color-success;
		color: #fff;
		border: none;
	}

	&.plain {
		background-color: transparent;

		&::after {
			border: none;
		}
	}
}
.m_textover {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.m_text_center {
	text-align: center;
}
</style>
