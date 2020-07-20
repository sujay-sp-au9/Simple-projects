function convertToRoman(num) {
  let lookup = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let r = "";
  for (let i in lookup)
    while (lookup[i] <= num) {
      r += i;
      num -= lookup[i];
    }
  console.log(r);
  return r;
}

convertToRoman(83);
