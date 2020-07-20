function diffArray(arr1, arr2) {
  let newArr = [];
  newArr = compare(arr1, arr2);
  newArr = newArr.concat(compare(arr2, arr1));
  function compare(x, y) {
    let newArr = [];
    for (let i = 0; i < x.length; i++)
      if (y.filter((temp) => temp != x[i]).length == y.length)
        newArr.push(x[i]);
    return newArr;
  }

  return newArr;
}

console.log(diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]));
console.log(
  diffArray(
    ["andesite", "grass", "dirt", "pink wool", "dead shrub"],
    ["diorite", "andesite", "grass", "dirt", "dead shrub"]
  )
);
