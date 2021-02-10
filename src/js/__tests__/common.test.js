import luhnAlgorithmValidate, { getPaymentIssuer } from '../common';

describe('luhnAlgorithmValidate method', () => {
  test('Empty parameter of function', () => {
    const result = luhnAlgorithmValidate('');
    expect(result).toBeFalsy();
  });

  test('No parameter of function', () => {
    const result = luhnAlgorithmValidate();
    expect(result).toBeFalsy();
  });

  test('Parameter of function is not number', () => {
    const result = luhnAlgorithmValidate('12345abc67890');
    expect(result).toBeFalsy();
  });

  test.each([
    ['4532079914300606', true],
    ['4716743075161549', true],
    ['4485153607256178894', true],
    ['6011641775786457', true],
    ['6011203789635822', true],
    ['6011371724373568135', true],
    ['30012281361518', true],
    ['30054064332241', true],
    ['30412245982021', true],
    ['4913288243303756', true],
    ['4917352566214358', true],
    ['4913146664087300', true],
    ['5330047090790842', true],
    ['2720995042281655', true],
    ['5371253002502578', true],
    ['3541575169591162', true],
    ['3541465645775383', true],
    ['3538361564667597755', true],
    ['36826306227485', true],
    ['36962343288162', true],
    ['36435319711244', true],
    ['349279620447623', true],
    ['374188335570488', true],
    ['344278289446087', true],
    ['5574370837040031', true],
    ['5551271350312178', true],
    ['5480693710928565', true],
  ])('card number %s validation is %s', (numberStr, expected) => {
    const received = luhnAlgorithmValidate(numberStr);
    expect(received).toBe(expected);
  });

  test.each([
    ['0000000000000001', false],
  ])('card number %s validation is %s', (numberStr, expected) => {
    const received = luhnAlgorithmValidate(numberStr);
    expect(received).toBe(expected);
  });
});

describe('getPaymentIssuer method', () => {
  test('Parameter of function is not number - throw', () => {
    expect(() => {
      getPaymentIssuer('12345abc67890');
    }).toThrowError(Error);
    expect(() => {
      getPaymentIssuer('qwerty');
    }).toThrowError(Error);
  });

  test('Parameter of function has wrong length - throw', () => {
    expect(() => {
      getPaymentIssuer('1234567890');
    }).toThrowError(Error);
    expect(() => {
      getPaymentIssuer('12345678901234567890');
    }).toThrowError(Error);
  });

  test('Empty parameter of function - throw', () => {
    expect(() => {
      getPaymentIssuer('');
    }).toThrowError(Error);
  });

  test('No parameter of function - throw', () => {
    expect(() => {
      getPaymentIssuer();
    }).toThrowError(Error);
  });

  test.each([
    ['4532079914300606', 'visa'],
    ['4716743075161549', 'visa'],
    ['4485153607256178894', 'visa'],
    ['6011641775786457', 'discover'],
    ['6011203789635822', 'discover'],
    ['6011371724373568135', 'discover'],
    ['30012281361518', 'diners'],
    ['30054064332241', 'diners'],
    ['30412245982021', 'diners'],
    ['4913288243303756', 'visa'],
    ['4917352566214358', 'visa'],
    ['4913146664087300', 'visa'],
    ['5330047090790842', 'mastercard'],
    ['2720995042281655', 'mastercard'],
    ['5371253002502578', 'mastercard'],
    ['3541575169591162', 'jcb'],
    ['3541465645775383', 'jcb'],
    ['3538361564667597755', 'jcb'],
    ['36826306227485', 'diners'],
    ['36962343288162', 'diners'],
    ['36435319711244', 'diners'],
    ['349279620447623', 'amex'],
    ['374188335570488', 'amex'],
    ['344278289446087', 'amex'],
    ['5574370837040031', 'mastercard'],
    ['5551271350312178', 'mastercard'],
    ['5480693710928565', 'mastercard'],
    ['2204000019724445', 'mir'],
    ['6377434655047390', 'unknown'],
    ['0604260886076678', 'unknown'],
  ])('card number %s issuer is %s', (numberStr, expected) => {
    const received = getPaymentIssuer(numberStr);
    expect(received).toBe(expected);
  });
});
