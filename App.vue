<script>
	export default {
		onLaunch: function () {
			this.login().then(res => {
				const { code } = res
				console.log(code);
				uni.request({
					url: 'http://127.0.0.1:7001/api/WXLogin',
					method: 'GET',
					data: {
						code,
					},
					success(res) {
						console.log(res);
					},
					fail(e) {
						console.log(e);
					}
				})
			})
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		},
		methods: {
			login() {
				return new Promise((resolve, reject) => {
					uni.login({
						success: resolve
					})
				})
			},
			
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
