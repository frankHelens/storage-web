// import * as esriLoader from 'esri-loader'

export const momentReset = (moment) => {
  moment.defineLocale('zh-cn', {
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    longDateFormat: {
      LT: 'Ah点mm分',
      LTS: 'Ah点m分s秒',
      L: 'YYYY-MM-DD',
      LL: 'YYYY年MMMD日',
      LLL: 'YYYY年MMMD日Ah点mm分',
      LLLL: 'YYYY年MMMD日ddddAh点mm分',
      l: 'YYYY-MM-DD',
      ll: 'YYYY年MMMD日',
      lll: 'YYYY年MMMD日Ah点mm分',
      llll: 'YYYY年MMMD日ddddAh点mm分'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0
      }
      if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
        return hour
      } else if (meridiem === '下午' || meridiem === '晚上') {
        return hour + 12
      } else {
        // '中午'
        return hour >= 11 ? hour : hour + 12
      }
    },
    meridiem: function (hour, minute, isLower) {
      var hm = hour * 100 + minute
      if (hm < 600) {
        return '凌晨'
      } else if (hm < 900) {
        return '早上'
      } else if (hm < 1130) {
        return '上午'
      } else if (hm < 1230) {
        return '中午'
      } else if (hm < 1800) {
        return '下午'
      } else {
        return '晚上'
      }
    },
    calendar: {
      sameDay: function () {
        return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT'
      },
      nextDay: function () {
        return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT'
      },
      lastDay: function () {
        return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT'
      },
      nextWeek: function () {
        var startOfWeek, prefix
        startOfWeek = moment().startOf('week')
        prefix = this.unix() - startOfWeek.unix() >= 7 * 24 * 3600 ? '[下]' : '[本]'
        return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm'
      },
      lastWeek: function () {
        var startOfWeek, prefix
        startOfWeek = moment().startOf('week')
        prefix = this.unix() < startOfWeek.unix() ? '[上]' : '[本]'
        return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm'
      },
      sameElse: 'LL'
    },
    ordinalParse: /\d{1,2}(日|月|周)/,
    ordinal: function (number, period) {
      switch (period) {
        case 'd':
        case 'D':
        case 'DDD':
          return number + '日'
        case 'M':
          return number + '月'
        case 'w':
        case 'W':
          return number + '周'
        default:
          return number
      }
    },
    relativeTime: {
      future: '%s内',
      past: '%s前',
      s: '几秒',
      m: '1 分钟',
      mm: '%d 分钟',
      h: '1 小时',
      hh: '%d 小时',
      d: '1 天',
      dd: '%d 天',
      M: '1 个月',
      MM: '%d 个月',
      y: '1 年',
      yy: '%d 年'
    },
    week: {
      // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
      dow: 1, // Monday is the first day of the week.
      doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
  })
}
// export const ArcGIS = (callback) => {
//   if (!esriLoader.isLoaded()) {
//     esriLoader.bootstrap((err) => {
//       if (err) {
//         console.error(err)
//       } else {
//         ArcGISLoader(callback)
//       }
//     }, {
//       url: 'https://js.arcgis.com/3.20/'
//     })
//   } else {
//     ArcGISLoader(callback)
//   }
// }

// const ArcGISLoader = (callback) => {
//   esriLoader.dojoRequire([
//     'esri/map',
//     'esri/layers/ArcGISDynamicMapServiceLayer',
//     'dojo/_base/declare',
//     'esri/geometry/Extent',
//     'esri/SpatialReference',
//     'esri/geometry/Point',
//     'esri/layers/TileInfo',
//     'esri/layers/TiledMapServiceLayer',
//     'dojo/domReady!'
//   ], (Map, ArcGISDynamicMapServiceLayer, declare, Extent, SpatialReference, Point, TileInfo, TiledMapServiceLayer) => {
//     const Amap = ArcGISAmap(declare, Extent, SpatialReference, Point, TileInfo, TiledMapServiceLayer)
//     callback({
//       Map, ArcGISDynamicMapServiceLayer, declare, Extent, SpatialReference, Point, TileInfo, TiledMapServiceLayer, Amap
//     })
//   })
// }

// const ArcGISAmap = (declare, Extent, SpatialReference, Point, TileInfo, TiledMapServiceLayer) => {
//   return declare('ArcGISAmap', TiledMapServiceLayer, {
//     layertype: 'road',
//     constructor: function (args) {
//       this.spatialReference = new SpatialReference({
//         wkid: 3857
//       })
//       declare.safeMixin(this, args)
//       this.fullExtent = new Extent(-20037508.342787, -20037508.342787, 20037508.342787, 20037508.342787, this.spatialReference)
//       this.initialExtent = this.fullExtent
//       this.tileInfo = new TileInfo({
//         'cols': 256,
//         'rows': 256,
//         'compressionQuality': 0,
//         'origin': new Point(-20037508.342787, 20037508.342787, this.spatialReference),
//         'spatialReference': this.spatialReference,
//         'lods': [{
//           'level': 0,
//           'resolution': 156543.033928,
//           'scale': 591657527.591555
//         }, {
//           'level': 1,
//           'resolution': 78271.5169639999,
//           'scale': 295828763.795777
//         }, {
//           'level': 2,
//           'resolution': 39135.7584820001,
//           'scale': 147914381.897889
//         }, {
//           'level': 3,
//           'resolution': 19567.8792409999,
//           'scale': 73957190.948944
//         }, {
//           'level': 4,
//           'resolution': 9783.93962049996,
//           'scale': 36978595.474472
//         }, {
//           'level': 5,
//           'resolution': 4891.96981024998,
//           'scale': 18489297.737236
//         }, {
//           'level': 6,
//           'resolution': 2445.98490512499,
//           'scale': 9244648.868618
//         }, {
//           'level': 7,
//           'resolution': 1222.99245256249,
//           'scale': 4622324.434309
//         }, {
//           'level': 8,
//           'resolution': 611.49622628138,
//           'scale': 2311162.217155
//         }, {
//           'level': 9,
//           'resolution': 305.748113140558,
//           'scale': 1155581.108577
//         }, {
//           'level': 10,
//           'resolution': 152.874056570411,
//           'scale': 577790.554289
//         }, {
//           'level': 11,
//           'resolution': 76.4370282850732,
//           'scale': 288895.277144
//         }, {
//           'level': 12,
//           'resolution': 38.2185141425366,
//           'scale': 144447.638572
//         }, {
//           'level': 13,
//           'resolution': 19.1092570712683,
//           'scale': 72223.819286
//         }, {
//           'level': 14,
//           'resolution': 9.55462853563415,
//           'scale': 36111.909643
//         }, {
//           'level': 15,
//           'resolution': 4.77731426794937,
//           'scale': 18055.954822
//         }, {
//           'level': 16,
//           'resolution': 2.38865713397468,
//           'scale': 9027.977411
//         }, {
//           'level': 17,
//           'resolution': 1.19432856685505,
//           'scale': 4513.988705
//         }, {
//           'level': 18,
//           'resolution': 0.597164283559817,
//           'scale': 2256.994353
//         }, {
//           'level': 19,
//           'resolution': 0.298582141647617,
//           'scale': 1128.497176
//         }]
//       })
//       this.loaded = true
//       this.onLoad(this)
//     },
//     getTileUrl: function (level, row, col) {
//       var url = ''
//       switch (this.layertype) {
//         case 'road':
//           url = 'http://webrd0' + (col % 4 + 1) + '.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=' + col + '&y=' + row + '&z=' + level
//           break
//         case 'st':
//           url = 'http://webst0' + (col % 4 + 1) + '.is.autonavi.com/appmaptile?style=6&x=' + col + '&y=' + row + '&z=' + level
//           break
//         case 'label':
//           url = 'http://webst0' + (col % 4 + 1) + '.is.autonavi.com/appmaptile?style=8&x=' + col + '&y=' + row + '&z=' + level
//           break
//         default:
//           url = 'http://webrd0' + (col % 4 + 1) + '.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=' + col + '&y=' + row + '&z=' + level
//           break
//       }
//       return url
//     }
//   })
// }
