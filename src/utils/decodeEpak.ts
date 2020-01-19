
export const toArrayBuffer = (buf: any) => {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}

export const decodeEpak = (buffer: any, options?: any) => {
  var headerOnly = !!(options || {}).headerOnly;
  var i = 0;
  var view = new DataView(buffer);

  console.log(view)
  var head = decodeUTF8(new Uint8Array(buffer, i, 4));
  i += 4;
  if (head !== "head") {
    throw new Error("expected 'head' but found '" + head + "'");
  }

  var length = view.getInt32(i);
  i += 4;
  var header = JSON.parse(decodeUTF8(new Uint8Array(buffer, i, length)));
  i += length;

  var block;
  var blocks = [];
  var type;
  while ((type = decodeUTF8(new Uint8Array(buffer, i, 4))) !== "tail" && !headerOnly) {
    i += 4;
    length = view.getInt32(i);
    i += 4;
    switch (type) {
      case "ppak":
        block = decodePpakBlock(buffer, i, length);
        break;
      default:
        throw new Error("unknown block type: " + type);
    }
    blocks.push(block);
    i += length;
  }

  return { header: header, blocks: blocks };
};

const decodeUTF8 = (bytes: any) => {
  var charCodes = [];
  for (var i = 0; i < bytes.length;) {
    var b = bytes[i++];
    switch (b >> 4) {
      case 0xc:
      case 0xd:
        b = (b & 0x1f) << 6 | bytes[i++] & 0x3f;
        break;
      case 0xe:
        b = (b & 0x0f) << 12 | (bytes[i++] & 0x3f) << 6 | bytes[i++] & 0x3f;
        break;
      default:
      // use value as-is
    }
    charCodes.push(b);
  }
  return String.fromCharCode.apply(null, charCodes);
}

const decodePpakBlock = (buffer: any, offset: any, length: any) => {
  var view = new DataView(buffer, offset, length);
  return decodePpak(new Uint8Array(buffer, offset + 16, length - 16), view.getInt32(0), // cols
    view.getInt32(4), // rows
    view.getInt32(8), // grids
    view.getFloat32(12)); // scaleFactor
}

const decodePpak = function (bytes: any, cols: any, rows: any, grids: any, scaleFactor: any) {
  var values = new Float32Array(cols * rows * grids);
  varpackDecode(values, bytes);
  undeltaPlane(values, cols, rows, grids);
  dequantize(values, scaleFactor);
  return values;
};

const varpackDecode = function (values: any, bytes: any, ) {
  var i = 0,
    j = 0;
  while (i < bytes.length) {
    var b = bytes[i++];
    if (b < 128) {
      b = b << 25 >> 25;
    } else {
      switch (b >> 4) {
        case 0x8:
        case 0x9:
        case 0xa:
        case 0xb:
          b = b << 26 >> 18 | bytes[i++];
          break;
        case 0xc:
        case 0xd:
          b = b << 27 >> 11 | bytes[i++] << 8 | bytes[i++];
          break;
        case 0xe:
          b = b << 28 >> 4 | bytes[i++] << 16 | bytes[i++] << 8 | bytes[i++];
          break;
        case 0xf:
          if (b === 255) {
            for (var run = 1 + bytes[i++]; run > 0; run--) {
              values[j++] = NaN;
            }
            continue;
          } else {
            b = bytes[i++] << 24 | bytes[i++] << 16 | bytes[i++] << 8 | bytes[i++];
          }
          break;
      }
    }
    values[j++] = b;
  }
  return values;
};

const undeltaPlane = function (values: any, cols: any, rows: any, grids: any) {
  var x, y, z, i, j, k, p;

  for (z = 0; z < grids; z++) {
    k = z * cols * rows;
    for (x = 1; x < cols; x++) {
      i = k + x;
      p = values[i - 1];
      values[i] += p === p ? p : 0;
    }
    for (y = 1; y < rows; y++) {
      j = k + y * cols;
      p = values[j - cols];
      values[j] += p === p ? p : 0;
      for (x = 1; x < cols; x++) {
        i = j + x;
        var a = values[i - 1];
        var b = values[i - cols];
        var c = values[i - cols - 1];
        p = a + b - c;
        values[i] += p === p ? p : a === a ? a : b === b ? b : c === c ? c : 0;
      }
    }
  }

  return values;
};

const dequantize = function (values: any, scaleFactor: any) {
  var m = Math.pow(10, scaleFactor);
  for (var i = 0; i < values.length; i++) {
    var v = values[i];
    values[i] = v === v ? v / m : 7e37;
  }
  return values;
};
