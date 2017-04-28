//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    income: null,
    fee: null,
    money: null,
    msg: "请输入税前收入和社保公积金扣费！"
  },
  //事件处理函数
  bindIncomeInput: function(e) {
    this.setData({
      income: e.detail.value
    })
  },
  bindFeeInput: function (e) {
    this.setData({
      fee: e.detail.value
    })
  },
  cal: function () {
    if (this.data.income == null || this.data.fee == null) {
      this.setData({
        msg: "输入有误，请正确输入税前收入和社保公积金！",
        money: this.data.income + this.data.fee
      })
    } else {
      this.setData({
        money: (this.data.income - this.data.fee) * 0.8
      })
    }
  },
  clear: function () {
    this.setData({
      income: null,
      fee: null,
      money: null,
      msg: "请输入税前收入和社保公积金扣费！"
    })
  }
})
