import got from 'got'
import * as fs from 'fs'
import * as stream from "stream";
import { promisify } from "util";
import { urlWrapper, getDate } from '../utils';
import { decodeEpak, toArrayBuffer } from '../utils/decodeEpak';

let grib2json = require('weacast-grib2json')


const pipeline = promisify(stream.pipeline);
let wstream: fs.WriteStream = undefined;

const app = {
  async start() {
    const time = getDate()
    const url = urlWrapper(time, '风')
    console.log(url)
    await pipeline(
      got.stream(url),
      (wstream = fs.createWriteStream(`log/data/epak/demo.epak`))
    )
    wstream.end();
    console.log('download finish')
    // const data = fs.readFileSync("log/data/epak/gfs.grib");
    // const epak = decodeEpak(toArrayBuffer(data));
    // const jpak = JSON.stringify(epak);
    // const jpakBlocks = JSON.stringify(epak.blocks);
    // fs.writeFile('log/data/json/jpak.json', jpak, function () { });
    // fs.writeFile('log/data/json/jpakBlocks.json', jpakBlocks, function () { });
    // console.log('json finish')
    try {
      const _json = await grib2json('log/data/epak/2020011818.f000', {
        data: true,
        output: 'log/data/json/data.json'
      })
    } catch (error) {
      console.log(error)
    }
  },
}

export default app