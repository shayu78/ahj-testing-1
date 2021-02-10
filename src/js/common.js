// Information about issuer identification number get from http://en.wikipedia.org/wiki/Credit_card_numbers
export function getPaymentIssuer(numberStr) {
  const size = numberStr.length;
  if (/\D/.test(numberStr) || size < 13 || size > 19) throw new Error('Invalid card number');
  if (/^3[47]\d{13}$/.test(numberStr)) return 'amex';
  if (/^3(?:0[0-5]|[68]\d)\d{11}$/.test(numberStr)) return 'diners';
  if (/^6(?:011|5\d{2}|4[4-9]\d|2(?:212[6-9]|21[3-9]\d|2[2-8]\d{2}|29[01]\d|292[0-5]))\d{12,15}$/.test(numberStr)) return 'discover';
  if (/^(?:5[1-5]\d{2}|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)\d{12}$/.test(numberStr)) return 'mastercard';
  if (/^220[0-4]\d{12}$/.test(numberStr)) return 'mir';
  if (/^3(?:52[89]|5[3-8]\d)\d{12,15}$/.test(numberStr)) return 'jcb';
  if (/^4\d{12}(?:\d{3})?(?:\d{3})?$/.test(numberStr)) return 'visa';
  return 'unknown';
}

export default function luhnAlgorithmValidate(numberStr) {
  if (/\D/.test(numberStr)) return false;
  const arrayNumbers = Array.from(numberStr).map((value) => parseInt(value, 10));
  const checkDigit = arrayNumbers.pop();
  const summary = arrayNumbers
    .reverse()
    .map((value, index) => {
      if ((index % 2) === 0) {
        let result = value * 2;
        if (result > 9) result -= 9;
        return result;
      }
      return value;
    })
    .reduce((accumulator, value) => accumulator + value, 0) + checkDigit;
  return (summary % 10) === 0;
}
