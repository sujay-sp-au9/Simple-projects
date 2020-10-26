function telephoneCheck(str) {
  str = str.split("");
  console.log(str);
  let str1 = [],
    str2 = [],
    temp;
  if (str[0] == 1) {
    if ((str[1] == " ") | (str[1] == "(")) {
      str1 = str.filter((x) => parseInt(x));
      str2 = str.filter((x) => (x == "(") | (x == ")"));
    }
    if ((str1.length == 11) & (str2.length % 2 == 0)) return true;
  } else {
    if ((str[1] != " ") & (str[1] != "(") & (str[str.length - 1] != ")")) {
      str1 = str.filter((x) => parseInt(x));
      str2 = str.filter((x) => (x == "(") | (x == ")"));
    }
    if ((str1.length == 10) & ((str2.length == 0) | (str2.length == 2)))
      return true;
  }
  return false;
}

console.log(telephoneCheck("(555)5(55?)-5555"));
