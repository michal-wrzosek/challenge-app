import { integerToPrice } from './integerToPrice';

describe('util/parsers/integerToPrice', () => {
  it('formats price integer to USD price', () => {
    expect(integerToPrice(140099)).toEqual('$1,400.99');
    expect(integerToPrice(99)).toEqual('$0.99');
  });

  it('return N/A if undefined', () => {
    expect(integerToPrice()).toEqual('N/A');
  });

  it('return N/A if null', () => {
    expect(integerToPrice(null)).toEqual('N/A');
  });
});
