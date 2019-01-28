import {ajax} from '/common/ajax.js'

export default {
	wxLogin(data) {
		return ajax('/api/WXLogin', data)
	}
}