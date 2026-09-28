interface Companion {
  id: number
  nickname: string
  gender: string
  mode: string
  rank: string
  description: string
  price: number
  rating: number
  reviewCount: number
  online: boolean
  tags: string[]
}

const companions: Companion[] = [
  {
    id: 1,
    nickname: '阿泽',
    gender: '男',
    mode: '攻坚',
    rank: '黑鹰',
    description: '主攻突击位，沟通稳定，可四排',
    price: 30,
    rating: 4.9,
    reviewCount: 126,
    online: true,
    tags: ['突击位', '四排']
  },
  {
    id: 2,
    nickname: '小北',
    gender: '女',
    mode: '摸金',
    rank: '三角洲巅峰',
    description: '熟图带跑，物资路线熟悉',
    price: 35,
    rating: 4.8,
    reviewCount: 83,
    online: true,
    tags: ['熟图', '摸金']
  },
  {
    id: 3,
    nickname: '老K',
    gender: '男',
    mode: '摸金',
    rank: '黑鹰',
    description: '稳定沟通，适合新手熟悉地图',
    price: 25,
    rating: 4.7,
    reviewCount: 61,
    online: false,
    tags: ['新手友好', '单排']
  },
  {
    id: 4,
    nickname: '柚子',
    gender: '女',
    mode: '攻坚',
    rank: '钻石',
    description: '轻松娱乐，主打配合和游戏体验',
    price: 28,
    rating: 4.9,
    reviewCount: 104,
    online: true,
    tags: ['娱乐', '四排']
  },
  {
    id: 5,
    nickname: 'Seven',
    gender: '男',
    mode: '攻坚',
    rank: '黑鹰',
    description: '主打高强度对局，可语音交流',
    price: 40,
    rating: 5.0,
    reviewCount: 42,
    online: true,
    tags: ['高强度', '语音']
  }
]

Component({
  data: {
    modes: ['全部', '攻坚', '摸金'],
    genders: ['全部', '男', '女'],

    selectedMode: '全部',
    selectedGender: '全部',
    onlyOnline: false,

    companions,
    visibleCompanions: companions
  },

  methods: {
    onModeTap(
      event: WechatMiniprogram.BaseEvent
    ) {
      const mode = event.currentTarget.dataset.value as string

      this.setData({
        selectedMode: mode
      })

      this.applyFilters()
    },

    onGenderTap(
      event: WechatMiniprogram.BaseEvent
    ) {
      const gender = event.currentTarget.dataset.value as string

      this.setData({
        selectedGender: gender
      })

      this.applyFilters()
    },

    onOnlineChange(
      event: WechatMiniprogram.SwitchChange
    ) {
      this.setData({
        onlyOnline: event.detail.value
      })

      this.applyFilters()
    },

    applyFilters() {
      const {
        selectedMode,
        selectedGender,
        onlyOnline
      } = this.data

      const result = companions.filter(item => {
        const modeMatched =
          selectedMode === '全部' ||
          item.mode === selectedMode

        const genderMatched =
          selectedGender === '全部' ||
          item.gender === selectedGender

        const onlineMatched =
          !onlyOnline ||
          item.online

        return modeMatched &&
          genderMatched &&
          onlineMatched
      })

      this.setData({
        visibleCompanions: result
      })
    },

    onCompanionTap(
      event: WechatMiniprogram.BaseEvent
    ) {
      const id = event.currentTarget.dataset.id

      wx.showToast({
        title: `陪玩 ID：${id}`,
        icon: 'none'
      })

      // 下一步会改成：
      // wx.navigateTo({
      //   url: `/pages/companion-detail/companion-detail?id=${id}`
      // })
    }
  }
})