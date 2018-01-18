
export const setConfig = config => {
    if (process.env.NODE_ENV === 'development') {
        return
    } else {
      return wx.config(config)
    }
}
export const getLocation = () => {
    if (process.env.NODE_ENV === 'development') {
        return {
            latitude: 36, // 纬度，浮点数，范围为90 ~ -90
            longitude: 116,  // 经度，浮点数，范围为180 ~ -180。
            speed: 2, // 速度，以米/每秒计
            accuracy: .5 // 位置精度
        }
    } else {
        return new Promise((resolve, reject) => {
            wx.ready(() => {
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: resolve,
                    error: reject
                })
            })
        })
    }
    
}
export const openLocation = (params) => {
    wx.openLocation({
        latitude: parseFloat(params.lat), // 纬度，浮点数，范围为90 ~ -90
        longitude: parseFloat(params.lng), // 经度，浮点数，范围为180 ~ -180。
        name: params.title || '', // 位置名
        address: params.desc || '', // 地址详情说明
        scale: params.scale || 13, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: params.link || '' // 在查看位置界面底部显示的超链接,可点击跳转
    })
}