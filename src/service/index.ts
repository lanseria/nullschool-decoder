const app = {
  start() {
    console.log(this.getDate())
  },
  getDate(date: Date, i: any = 0) {
    var typeLst = ['precip_3hr', 'cape', 'total_precipitable_water', 'mean_sea_level_pressure'];
    var date = date || new Date();
    var floder = `${typeLst[i]}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`;
    var floderUrl = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`;
    var hour = this.gfsHour(date);
    return floderUrl + this.padHour(hour) + "00-" + typeLst[i]
  },
  padHour(a: any) {
    a = "" + a;
    if (a.length < 2)
      return "0" + a;
    return a;
  },
  gfsHour(date: Date) {
    return Math.floor(date.getHours() / 3) * 3;
  }
}

export default app