Component({
  data: {
      selected: 0,
      color: "#BDBDBD",
      selectedColor: "#212121",
      tabList: [{

          list1: [{
            "pagePath": "/pages/test/test",
            "text": "主页",
            "iconPath": "/image/home.png",
            "selectedIconPath": "/image/home.png"
          },
          {
            "pagePath": "/pages/list/list",
            "text": "详细",
            "iconPath": "/image/list.jpg",
            "selectedIconPath": "/image/list.jpg"
          },
          {
            "pagePath": "/pages/info/info",
            "text": "个人",
            "iconPath": "/image/info.png",
            "selectedIconPath": "/image/info.png"
          }
          ],



          list2: [{
            "pagePath": "/pages/scan1/scan1",
            "text": "主页",
            "iconPath": "/image/home.png",
            "selectedIconPath": "/image/home.png"
          },{
            "pagePath": "/pages/list/list",
            "text": "详细",
            "iconPath": "/image/list.jpg",
            "selectedIconPath": "/image/list.jpg"
          },
          
          {
            "pagePath": "/pages/info/info",
            "text": "个人",
            "iconPath": "/image/info.png",
            "selectedIconPath": "/image/info.png"
          }
          ],
      }],
      list: []
  },
  attached() {
      const roleId = wx.getStorageSync('userid')
      if (roleId == 1) { //总仓
          this.setData({
              list: this.data.tabList[0].list1
          }) 
      } else if (roleId == 2) { //分仓
          this.setData({
              list: this.data.tabList[0].list2
          })
      }
  },
  methods: {
      switchTab(e) {
          const data = e.currentTarget.dataset
          const url = data.path
          wx.switchTab({ url })
          //this.setData({
          //    selected: data.index
          //})
      }
  },



})