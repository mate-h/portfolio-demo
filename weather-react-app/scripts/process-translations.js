let translationData = [
  {
    key: "yourCities",
    data: [
      {
        symbol: "hu",
        text: "A városaid",
      },
      //...
    ],
  },
  //...
];
let bundle = t.reduce((result, translation) => {
  let key = translation.key;
  return translation.data.reduce((acc, b) => {
    let l = new Intl.Locale(b.symbol).minimize().toString();
    return { ...acc, [l]: { [key]: b.text, ...acc[l] } };
  }, result);
}, {});

let schema = Object.keys(bundle.en);

//schemaless
let optimized = Object.entries(bundle).reduce((acc, [k, v]) => {
  return { [k]: Object.values(v), ...acc };
}, {});
