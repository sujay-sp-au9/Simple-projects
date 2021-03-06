function checkCashRegister(price, cash, cid) {
  var denom = [
    { name: "ONE HUNDRED", val: 100.0 },
    { name: "TWENTY", val: 20.0 },
    { name: "TEN", val: 10.0 },
    { name: "FIVE", val: 5.0 },
    { name: "ONE", val: 1.0 },
    { name: "QUARTER", val: 0.25 },
    { name: "DIME", val: 0.1 },
    { name: "NICKEL", val: 0.05 },
    { name: "PENNY", val: 0.01 },
  ];
  for (let i = denom.length - 1, j = 0; i >= 0; i--, j++)
    denom[i]["num"] = Math.ceil(cid[j][1] / denom[i]["val"]);
  let change = cash - price;
  console.log(change);
  for (let i = 0; i < denom.length; i++) {
    while ((change >= denom[i]["val"]) & (denom[i]["num"] > 0)) {
      change = Number.parseFloat(change - denom[i]["val"]).toFixed(2);
      denom[i]["num"]--;
      console.log(change);
      console.log(denom[i]);
    }
  }
  return change;
}

checkCashRegister(3.26, 100, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
