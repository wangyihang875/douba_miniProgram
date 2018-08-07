// pages/douban/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'in_theaters',
    page: 1,
    size: 20,
    totalPage: 1,
    movies: []
  },

  onPullDownRefresh() {
    this.setData({
      page:1,
      movies: []
    })
    wx.showLoading({
      title: '加载中',
    })
    this.retrieveData().then(() => {
      wx.stopPullDownRefresh()
      wx.hideLoading()
    })
  },

  loadMorePage() {
    if (this.data.page >= this.data.totalPage) return
    this.data.page++
      this.retrieveData()
  },

  retrieveData() {
    let app = getApp()
    let start = (this.data.page - 1) * this.data.size

    wx.showLoading({
      title: '加载中'
    })

    return app.request(`https://douban.uieee.com/v2/movie/${this.data.type}?start=${start}&count=${this.data.size}`)
      .then(res => {
        if (res.subjects.length) {
          console.log(res)
          let movies = this.data.movies.concat(res.subjects)
          let totalPage = Math.ceil(res.total / this.data.size)
          this.setData({
            movies: movies,
            totalPage: totalPage,
            page: this.data.page
          })
          wx.setNavigationBarTitle({
            title: res.title
          })
          console.log(movies)
        }
        console.log(`totalPage=${this.data.totalPage}|page=${this.data.page}`)
      }).catch(err => {
        console.error(err)
      }).finally(() => {
        wx.hideLoading()
      })
  },

  

  onLoad(options) {
    // 有三种类型： in_theaters  coming_soon  us_box
    this.data.type = options.type || this.data.type
    this.retrieveData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})