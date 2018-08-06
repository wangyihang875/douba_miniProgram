// pages/douban/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boards: [{
      key: 'in_theaters'
    }, {
      key: 'coming_soon'
    }, {
      key: 'top250'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    wx.getStorage({

      key: 'has_shown_splash',

      success: res => {

        this.retrieveData()

      },

      fail: err => {

        wx.redirectTo({

          url: '/pages/douban/splash',

        })

      }

    })

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

  },

  retrieveData() {
    let app = getApp()

    var promises = this.data.boards.map(function(board) {

      return app.request(`https://douban.uieee.com/v2/movie/${board.key}?start= 0&count=10`)

        .then(function(d) {

          if (!d) return board
          board.title = d.title

          board.movies = d.subjects

          return board

        }).catch(err => console.log(err))

    })


    return app.promise.all(promises).then(boards => {

      if (!boards || !boards.length) return

      this.setData({
        boards: boards,
        loading: false
      })

    })

  }
})