import * as moment from 'moment';
const typeMap = {
  风: 'wind-surface-level-gfs',
  温度: 'temp-surface-level-gfs',
  相对湿度: 'relative_humidity-surface-level-gfs',
  三小时降水量: 'precip_3hr-gfs',
  CAPE: 'cape-gfs',
  水汽含量: 'total_precipitable_water-gfs',
  云中总水量: 'total_cloud_water-gfs',
  MSLP: 'mean_sea_level_pressure-gfs',
  体感温度: 'misery_index-gfs'
}
const VERSION = '0.5'

type TypeMap = typeof typeMap
type TypeKey = keyof TypeMap
const urlWrapper = (time: string, type: TypeKey) => {
  const typeValue = typeMap[type]
  return `https://gaia.nullschool.net/data/gfs/${time}00-${typeValue}-${VERSION}.epak`
}
const app = {
  start() {
    const time = this.getDate()
    const url = urlWrapper(time, '风')
    console.log(url)
  },
  getDate(date: Date = new Date()) {
    const yearMonthDay = moment(date).utcOffset(0).format('YYYY/MM/DD/')
    return yearMonthDay + this.gfsHour(date)
  },
  gfsHour(date: Date = new Date()) {
    const hour = String(Math.floor(moment(date).utcOffset(0).hour() / 3) * 3)
    return hour.padStart(2, '0')
    // return Math.floor(date.getHours() / 3) * 3;
  }
}

export default app