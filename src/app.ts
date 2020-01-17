import databaseConnection from "./database/database.connection";
import app from './service/index'

function startServe(): Promise<any> {
  return new Promise((resolve, reject) => {
    return databaseConnection
      .then(() => {
        if (process.env.NODE_ENV !== "test") {
          app.start();
        }
        resolve(app);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export const eApp = startServe();