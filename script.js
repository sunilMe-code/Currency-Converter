const amount = document.getElementById("amount");
const from = document.getElementById("from");
const to = document.getElementById("to");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convert");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");


const countryList = {
  AED: "AE",
  AFN: "AF",
  ALL: "AL",
  AMD: "AM",
  ANG: "CW",
  AOA: "AO",
  ARS: "AR",
  AUD: "AU",
  AWG: "AW",
  AZN: "AZ",

  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  BTN: "BT",
  BWP: "BW",
  BYN: "BY",
  BZD: "BZ",

  CAD: "CA",
  CDF: "CD",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CZK: "CZ",

  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",

  EGP: "EG",
  ERN: "ER",
  ETB: "ET",
  EUR: "EU",

  FJD: "FJ",

  GBP: "GB",
  GEL: "GE",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",

  HKD: "HK",
  HNL: "HN",
  HTG: "HT",
  HUF: "HU",

  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",

  JMD: "JM",
  JOD: "JO",
  JPY: "JP",

  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",

  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LYD: "LY",

  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRU: "MR",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",

  NAD: "NA",
  NGN: "NG",
  NIO: "NI",
  NOK: "NO",
  NPR: "NP",
  NZD: "NZ",

  OMR: "OM",

  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",

  QAR: "QA",

  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",

  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  SSP: "SS",
  STN: "ST",
  SYP: "SY",

  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",

  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",

  VES: "VE",
  VND: "VN",
  VUV: "VU",

  WST: "WS",

  XAF: "CM",
  XCD: "AG",
  XOF: "SN",
  XPF: "PF",

  YER: "YE",

  ZAR: "ZA",
  ZMW: "ZM",
  ZWL: "ZW"
};

function updateFlag(select, img) {

  const countryCode = countryList[select.value];

  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

from.addEventListener("change", () => {
  updateFlag(from, fromFlag);
});

to.addEventListener("change", () => {
  updateFlag(to, toFlag);
});

async function getRates() {
  const response = await fetch("https://open.er-api.com/v6/latest/USD");

  const data = await response.json();

  return data.rates;
}



convertBtn.addEventListener("click", async () => {

  const rates = await getRates();

  const value = Number(amount.value);

  if (!value) {
    result.textContent = "Enter an amount";
    return;
  }

  const usdAmount = value / rates[from.value];

  const convertedAmount = usdAmount * rates[to.value];

  result.textContent = `${value} ${from.value} = ${convertedAmount.toFixed(2)} ${to.value}`;

});




const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function getLastSixMonths() {
  const months = [];
  const currentMonth = new Date().getMonth();

  for (let i = 5; i >= 0; i--) {
    const index = (currentMonth - i + 12) % 12;
    months.push(monthNames[index]);
  }

  return months;
}



const chart = new Chart(document.getElementById("chart"), {
  type: "line",
  data: {
    labels: getLastSixMonths(),
    datasets: [{
      label: `${from.value} to ${to.value}`,
      data: [89.85, 89.85, 95.00, 94.20, 96.10, 95.80]
    }]
  }
});


convertBtn.addEventListener("click", async () => {

  const values = await getMonthlyData();


  chart.data.datasets[0].label = `${from.value} to ${to.value}`;

  chart.data.datasets[0].data = values;

  chart.update();
});


async function getMonthlyData() {
  const API_KEY = "B5OCLESA2W62S41Z";

  const response = await fetch(
    `https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${from.value}&to_symbol=${to.value}&apikey=${API_KEY}`
  );

  const data = await response.json();


  const series = data["Time Series FX (Monthly)"];


  const values = [];

  if (!series) {
    alert("API limit reached. Try again later.");
    return [];
  }

  Object.entries(series)
    .slice(0, 6)
    .reverse()
    .forEach(([date, rate]) => {
      values.push(Number(rate["4. close"]));
    });

  return values;
};


