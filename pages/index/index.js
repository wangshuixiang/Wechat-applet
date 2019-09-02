//index.js
//获取应用实例
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext();
Page({
  data: {
    selMusic: {
      name: '478促眠',
      icon: 'iconsleep',
      url: ''
    },
    play: false,
    seek: false,
    duration: 0,
    currentTime: 0,

    musics: []
  },

  onShow() {
    innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46';
  },

  onLoad: function() {
    this.initMusic();
  },

  initMusic() {
    let list = [{
        name: '478促眠',
        icon: 'iconsleep',
        url: ''
      },
      {
        name: '白云湖水',
        icon: 'iconflower',
        url: ''
      },
      {
        name: '呼吸冥想',
        icon: 'iconthinking',
        url: ''
      },
      {
        name: '草原牧曲',
        icon: 'iconcc-month',
        url: ''
      },
      {
        name: '雪落伞上',
        icon: 'iconsnow',
        url: ''
      },
      {
        name: '大海深处',
        icon: 'iconstar',
        url: ''
      },
      {
        name: '空山飞鸟',
        icon: 'iconMountains',
        url: ''
      },
      {
        name: '大漠风沙',
        icon: 'iconDesert',
        url: ''
      },
      {
        name: '一碗面条',
        icon: 'iconnoodle',
        url: ''
      }, {
        name: '一包薯片',
        icon: 'iconicons-potato',
        url: ''
      },
      {
        name: '一颗苹果',
        icon: 'iconApple',
        url: ''
      },
      {
        name: '一杯冰水',
        icon: 'iconcup',
        url: ''
      },
    ];
    this.setData({
      musics: list
    });
  },

  selectHandler(e) {
    this.setData({
      play: false,
      seek: false,
      selMusic: e.currentTarget.dataset.item,
      duration: innerAudioContext.duration
    });
    innerAudioContext.stop();
  },
  processHandler() {
    innerAudioContext.onTimeUpdate(() => {
      console.log(this.data.seek);
      if (!this.data.seek) {
        this.setData({
          currentTime: innerAudioContext.currentTime
        });
      }
    });
  },
  playHandler() {
    this.setData({
      play: !this.data.play
    });
    if (this.data.play) {
      innerAudioContext.play();
      this.processHandler();
    } else {
      innerAudioContext.pause()
    }
  },

  slideHandler(e) {
    let time = e.detail.value;
    this.setData({
      seek: true,
      currentTime: time,
    });
  },

  seekHandler(e) {
    let time = e.detail.value;
    innerAudioContext.seek(time);
    this.setData({
      seek: false,
      currentTime: time,
    });
  },

})