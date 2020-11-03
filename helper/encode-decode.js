/*
slug length = 2 -> n
chars allowed = 2 [a,b] -> c
dhruv.com/aa - dhruv.com/bb - dhruv.com/ab - dhruv.com/ba = 4 (c^n)
slug length = 2
chars allowed = 3 [a,b,c]

ab - ac - ba - bc - ca - bc - aa - bb - cc = 9 (c^n)
with 62 chars allowed and length of the slug is 7, we can
generate 62^7 unique slugs
*/


const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function base62Encode(n) {
    let hashStr = '';
    while (n > 0) {
        hashStr = chars[n % 62] + hashStr;
        n = parseInt(n / 62);
    }
    return hashStr
}

function base62Decode(hashStr){
    let number = 0;
    let power = 0
    let strLength = hashStr.length-1;
    while (strLength >= 0) {
        number += chars.indexOf(hashStr[strLength]) * Math.pow(62,power);
        power++
        strLength--
    }
    return number
}

module.exports = {
    base62Decode,
    base62Encode
}

// console.log(base62Encode(100));
// console.log(base62Decode("aaaaaaa"));