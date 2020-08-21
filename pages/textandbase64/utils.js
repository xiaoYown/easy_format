const base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// function base64encode(str) {
//   let out, i, len;
//   let c1, c2, c3;

//   len = str.length;
//   i = 0;
//   out = '';
//   while (i < len) {
//     c1 = str.charCodeAt(i++) & 0xff;
//     if (i == len) {
//       out += base64EncodeChars.charAt(c1 >> 2);
//       out += base64EncodeChars.charAt((c1 & 0x3) << 4);
//       out += "==";
//       break;
//     }
//     c2 = str.charCodeAt(i++);
//     if (i == len) {
//       out += base64EncodeChars.charAt(c1 >> 2);
//       out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
//       out += base64EncodeChars.charAt((c2 & 0xF) << 2);
//       out += "=";
//       break;
//     }
//     c3 = str.charCodeAt(i++);
//     out += base64EncodeChars.charAt(c1 >> 2);
//     out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
//     out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
//     out += base64EncodeChars.charAt(c3 & 0x3F);
//   }
//   return out;
// }

// function utf16to8(str) {
//   let out, i, len, c;

//   out = '';
//   len = str.length;
//   for (i = 0; i < len; i++) {
//     c = str.charCodeAt(i);
//     if ((c >= 0x0001) && (c <= 0x007F)) {
//       out += str.charAt(i);
//     } else if (c > 0x07FF) {
//       out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
//       out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
//       out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
//     } else {
//       out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
//       out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
//     }
//   }
//   return out;
// }

// function _utf8_decode(utftext) {
//   let string = '';
//   let i = 0;
//   let c = 0, c1 = 0, c2 = 0;
//   while (i < utftext.length) {
//     c = utftext.charCodeAt(i);
//     if (c < 128) {
//       string += String.fromCharCode(c);
//       i++;
//     } else if ((c > 191) && (c < 224)) {
//       c2 = utftext.charCodeAt(i + 1);
//       string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
//       i += 2;
//     } else {
//       c2 = utftext.charCodeAt(i + 1);
//       c1 = utftext.charCodeAt(i + 2);
//       string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c1 & 63));
//       i += 3;
//     }
//   }
//   return string;
// }

// function base64Decode(input) {
//   let output = '';
//   let chr1, chr2, chr3;
//   let enc1, enc2, enc3, enc4;
//   let i = 0;
//   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
//   while (i < input.length) {
//     enc1 = base64EncodeChars.indexOf(input.charAt(i++));
//     enc2 = base64EncodeChars.indexOf(input.charAt(i++));
//     enc3 = base64EncodeChars.indexOf(input.charAt(i++));
//     enc4 = base64EncodeChars.indexOf(input.charAt(i++));
//     chr1 = (enc1 << 2) | (enc2 >> 4);
//     chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
//     chr3 = ((enc3 & 3) << 6) | enc4;
//     output = output + String.fromCharCode(chr1);
//     if (enc3 != 64) {
//       output = output + String.fromCharCode(chr2);
//     }
//     if (enc4 != 64) {
//       output = output + String.fromCharCode(chr3);
//     }
//   }
//   return output;
// }

// // 字符串转base64
// export function encodeOld(str) {
//   return base64encode(utf16to8(str));
// }

let _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export function encode(input) {
  let output = '',
    i = 0,
    chr1,
    chr2,
    chr3,
    enc1,
    enc2,
    enc3,
    enc4;
  input = encodeTransform(input);
  while (i < input.length) {
    // 首先获取前三个字符对应的 ASCII 码
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    // 再将这三个字符转化为 4 个 base64 字符所对应的数字
    // 取第一字符 chr1 的前 6 比特位作为 base64 字符 1 的索引
    enc1 = chr1 >> 2;
    // 取 chr1 的后2位，在末尾补 chr2 的前 4 位作为 base64 字符 2 的索引
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    // 取 chr2 的后 4 位，在末尾补 chr3 的前 2 位作为 base64 字符 3 的索引
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    // 取chr3 的后 6 位作为 base64 字符 4 的索引
    enc4 = chr3 & 63;

    // 判断是否要补位，即 + 0 ，补位则设置索引为 64，对应 ‘=’ 字符
    if (Number.isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (Number.isNaN(chr3)) {
      enc4 = 64;
    }
    output =
      output +
      _keyStr.charAt(enc1) +
      _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) +
      _keyStr.charAt(enc4);
  }
  return output;
}

export function decode(input) {
  let output = '',
    i = 0,
    chr1,
    chr2,
    chr3,
    enc1,
    enc2,
    enc3,
    enc4;

  while (i < input.length) {
    enc1 = _keyStr.indexOf(input.charAt(i++));
    enc2 = _keyStr.indexOf(input.charAt(i++));
    enc3 = _keyStr.indexOf(input.charAt(i++));
    enc4 = _keyStr.indexOf(input.charAt(i++));
    // 取 enc1 + enc2 的前2位组成 8 比特位即 1 字节
    chr1 = (enc1 << 2) | (enc2 >> 4);
    // 取enc2后 4 位 + enc3的前4位组成 8 比特位即 1 字节
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    // 取enc3前 2 位 + enc4 组成 8 比特位即 1 字节
    chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
  }
  output = decodeTransform(output);
  return output;
}

function encodeTransform(input) {
  let output = '';
  for (var n = 0; n < input.length; n++) {
    var c = input.charCodeAt(n); // 返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数。
    if (c < 128) {
      // 0-7位
      // 如果小于128 即是 ASCII 码，直接返回该 ASCII 码
      output += String.fromCharCode(c);
    } else if (c > 127 && c < 2048) {
      //  8 - 11 位
      // 这里是将二进制去除后六位，然后在开头加'11'补至八位二进制，变成一个大于等于192小于224的数字
      output += String.fromCharCode((c >> 6) | 192);
      // 这里是取二进制后六位, 然后在开头加'1'补至八位二进制，变成一个小于255大于等于128的数字
      output += String.fromCharCode((c & 63) | 128);
    } else {
      // 12-16位, 因为unicode最大位数为16
      // 这里是将二进制去除后12位，然后在开头加'111'补至八位二进制，变成一个大于等于224小于255的数字
      output += String.fromCharCode((c >> 12) | 224);
      // 这里取 7 - 12 位，然后在开头加'1'补至八位二进制，变成一个小于192大于等于128的数字
      output += String.fromCharCode(((c >> 6) & 63) | 128);
      // 这里取 0 - 6 位，然后在开头加'1'补至八位二进制，变成一个小于192大于等于128的数字
      output += String.fromCharCode((c & 63) | 128);
    }
  }
  return output;
}

function decodeTransform(input) {
  let output = '';
  let i = 0;
  let c = 0;
  let c1 = 0;
  let c2 = 0;
  while (i < input.length) {
    c = input.charCodeAt(i);
    if (c < 128) {
      // 1字符
      output += String.fromCharCode(c);
      i++;
    } else if (c > 191 && c < 224) {
      // 2字符
      c1 = input.charCodeAt(i + 1);
      output += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
      i += 2;
    } else {
      // 3字符
      c1 = input.charCodeAt(i + 1);
      c2 = input.charCodeAt(i + 2);
      output += String.fromCharCode(
        ((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63)
      );
      i += 3;
    }
  }
  return output;
}
