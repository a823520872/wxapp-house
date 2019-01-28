<script>
	export default {
		onLaunch: function() {
			if (wx.canIUse && wx.canIUse("getUpdateManager")) {
				let updateManager = wx.getUpdateManager();
				updateManager.onUpdateReady(function() {
					updateManager.applyUpdate();
				});
			}
			this.init()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			init() {
				const vm = this
				this.check({
					success() {
						console.log('已登录');
					},
					fail: vm.login
				})
			},
			check(o) {
				uni.checkSession({
					success: o.success,
					fail: o.fail
				})
			},
			login() {
				const vm = this
				uni.login({
					success: vm.getSession
				})
			},
			getSession(res) {
				console.log(res);
				const { code } = res
				this.$request.wxLogin({
					code
				}).then(r => {
					console.log(r);
				})
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
