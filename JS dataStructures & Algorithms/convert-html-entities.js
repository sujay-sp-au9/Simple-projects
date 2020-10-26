function convertHTML(str) {
  let x = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  };
  let key = Object.keys(x);
  str = str.split("");
  for (let i = 0; i < str.length; i++)
    for (let j = 0; j < 5; j++) if (str[i] == key[j]) str[i] = x[key[j]];
  str = str.join("");
  return str;
}

console.log(convertHTML('Stuff in "quotation marks"'));
