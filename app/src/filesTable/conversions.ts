export type RowConversionRuleOptions = {
  isHeader: boolean | undefined;
  colMap: ColMap;
}
export type RowConversionRule = (row: any[], options: RowConversionRuleOptions) => Promise<any[]>;

export type RowFilterRuleOptions = {
  withHeader: boolean | undefined;
  colMap: ColMap;
}
export type RowFilterRule = (options: RowFilterRuleOptions) => (row: any[], rowNumber?: number) => boolean;

export const defaultRowFilter: RowFilterRule = ({
  withHeader,
  colMap,
}) => (row, rowNumber) => {
  if (withHeader && rowNumber === 0) {
    return true;
  }
  const financialStatusColId = colMap.idx('Financial Status');
  if (row[financialStatusColId] !== 'Charged') {
    return false;
  }
  return true;
}

export const defaultRowConversion: RowConversionRule = async (row,
  {
    isHeader,
    colMap,
  }
) => {
  const merchantCurrency = 'PLN';
  const outputDateTimeFormat = 'yyyy-MM-dd HH:mm';
  const stringNumberRegexp = /([\d,.]+)/;
  const colsToKeep = [
    'Order Creation Date',
    'Currency of Transaction	',
    'Order Amount',
    'Amount Charged',
    'Financial Status',
    'Total Tax',
    'Buyer State',
    'Buyer Postal Code',
    'Buyer Country',
    'Item 1 Name',
    'Item 1 Price',
    'Item 1 Quantity',
  ];
  const indexesToKeep = colsToKeep.map(title => colMap.idx(title));
  const newRow = row.filter((_val, idx) => indexesToKeep.includes(idx));
  if (isHeader) {
    newRow.push('Merchant Currency');
    newRow.push('Currency Conversion');
    newRow.push('Amount (Merchant Currency)');
  } else {
    const orderCreationDate = parseGoogleDateTime(row[colMap.idx('Order Creation Date')]);
    newRow[0] = orderCreationDate.toISOString();

    const transactionCurrency = row[colMap.idx('Currency of Transaction')];
    const transactionValue = Number.parseFloat(row[colMap.idx('Amount Charged')].match(stringNumberRegexp).pop());

    newRow.push(merchantCurrency);

    const currencyConversion = await getConversionRate(transactionCurrency, merchantCurrency, orderCreationDate);
    const merchantCurrencyAmount = currencyConversion * transactionValue;

    newRow.push(currencyConversion);
    newRow.push(merchantCurrencyAmount);

  }
  return newRow;
}

export const mapColumns = (header: string[]) => {
  return [...header.values()].map;
}

export class ColMap {
  private header: string[] = [];

  idx(columnName: string) {
    return this.header.indexOf(columnName);
  }

  static mapColumns(header: string[]) {
    const colMap = new ColMap();
    colMap.header = header;
    return colMap;
  }
}

const parseGoogleDateTime = (googleDateTime: string) => {
  const dateTime = Date.parse(googleDateTime);
  const date = new Date(dateTime);
  return date;
}

const getConversionRate = async (base: string, target: string, date: Date) => {
  const url = `https://data.fixer.io/api/${date.toISOString().slice(0, 10)}?access_key=${window.localStorage.getItem('API_KEY')}&symbols=${base},${target}`;
  console.log(url);
  try{
    const response = await (await fetch(url)).json();
    console.log(response)
    return response.rates[target] / response.rates[base];
  }catch(err){
    console.error(err);
  }
  return -1;
}