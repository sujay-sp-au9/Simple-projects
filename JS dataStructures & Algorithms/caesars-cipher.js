function rot13(str) {
  let str1 = str.split("");
  for (let i = 0; i < str1.length; i++)
    if (/[A-Z]/.test(str1[i])) {
      let temp = str.charCodeAt(i) - 13;
      if (temp < 65) temp += 26;
      str1[i] = String.fromCharCode(temp);
    }
  return str1.join("");
}

rot13("SERR CVMMN!");
