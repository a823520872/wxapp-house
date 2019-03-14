import Utils from './utils'
export default (obj, params) => {
    return new Promise((resolve, reject) => {
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const element = params[key]
                element.map(item => {
                    if (item.required && obj[key] === '') {
                        const msg = item.msg || `字段${key}不能为空`
                        reject({ msg })
                    }
                    if (item.type === 'mobile' && !Utils.testMobile(obj[key])) {
                        const msg = item.msg || `手机号码错误`
                        reject({ msg })
                    }
                    if (item.type === 'array' && !(obj[key] && obj[key].length)) {
                        const msg = item.msg
                        reject({ msg })
                    }
                    if (item.type === 'number') {
                        const n = +obj[key]
                        if (!n) reject({ msg })
                    }
                })
            }
        }
        resolve()
    })
}
