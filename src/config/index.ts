
import path = require("path");
import * as dotenv from 'dotenv'

const basePath = path.resolve(`.env`)
const localPath = `${basePath}.local`

const load = (envPath: string) => {
  try {
    return dotenv.config({ path: envPath })
  } catch (err) {
    // only ignore error if file is not found
    if (err.toString().indexOf('ENOENT') < 0) {
      console.error(err)
    }
  }
}


load(localPath)
load(basePath)
function initConfig() {
  let env = load(localPath)
  env = load(basePath)
  return env
}
export default initConfig