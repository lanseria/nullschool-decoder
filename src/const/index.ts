export const TYPEMAP = {
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
export type TypeMap = typeof TYPEMAP
export type TypeMapKey = keyof TypeMap
export const VERSION = '0.5'