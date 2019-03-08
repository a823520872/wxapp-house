const x = 130
const y = 428
const space = 10
export default params => {
    return params.map((item, i) => {
        const li = { imageResource: item.url }
        if (i === 0) {
            li.dWidth = 490
            li.dHeight = 258
        } else {
            li.dWidth = 240
            li.dHeight = 160
        }
        return li
    })
}

function getPosition(ratio, width, height) {}
