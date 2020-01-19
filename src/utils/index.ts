import { TYPEMAP, TypeMapKey, VERSION } from '../const/index'
import * as moment from 'moment';
import * as path from 'path'
import { execFile } from "child_process";
import * as os from "os";
import * as fs from 'fs-extra';

/**
 * resolve path
 * @param _path
 */
export const resolve = (_path: string) => path.resolve(__dirname, '..', _path);

export const grib2jsonCommand = process.env.GRIB2JSON || resolve(`bin/${os.platform() === 'win32' ? 'grib2json.cmd' : 'grib2json'}`);

export const urlWrapper = (time: string, type: TypeMapKey) => {
  const typeValue = TYPEMAP[type]
  return `https://gaia.nullschool.net/data/gfs/${time}00-${typeValue}-${VERSION}.epak`
}

export const getDate = (date: Date = new Date()) => {
  const yearMonthDay = moment(date).utcOffset(0).format('YYYY/MM/DD/')
  return yearMonthDay + gfsHour(date)
}

export const gfsHour = (date: Date = new Date()) => {
  const hour = String(Math.floor(moment(date).utcOffset(0).hour() / 3) * 3)
  return hour.padStart(2, '0')
}

/**
 * transform data
 * @param path_
 * @param options
 * @returns {Promise<any>}
 */
export const grib2json = (path_: string, options: any) => {
  return new Promise((resolve, reject) => {
    execFile(`${grib2jsonCommand}`, ['--data', '--output', options.output, '--names', '--compact', path_],
      {
        maxBuffer: 8 * 1024 * 1024
      }, function (error, stdout, stderr) {
        if (error) {
          reject(error);
          return
        }
        if (options.output) {
          fs.readJson(options.output, (error: any, json: any) => {
            if (error) {
              reject(error);
              return
            }
            resolve(json);
          })
        } else {
          let json = JSON.parse(stdout);
          resolve(json)
        }
      })
  })
};