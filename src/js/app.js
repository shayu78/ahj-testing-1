import luhnAlgorithmValidate, { getPaymentIssuer } from './common';

const formElement = document.querySelector('.form');
const numberInputElement = document.querySelector('#number_input');
const cardValidateMessageElement = document.querySelector('.card__validate__message');

formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  cardValidateMessageElement.textContent = '';
  const activePaymentImageElement = document.querySelector('.active');
  if (activePaymentImageElement) activePaymentImageElement.classList.remove('active');
  const data = numberInputElement.value.trim();
  if (!data) {
    cardValidateMessageElement.textContent = 'Field is empty';
    return;
  }
  if (!luhnAlgorithmValidate(data)) {
    cardValidateMessageElement.textContent = 'Invalid card number';
    return;
  }
  try {
    const payment = getPaymentIssuer(data);
    const paymentImageElement = document.querySelector(`[data-payment=${payment}]`);
    if (paymentImageElement) paymentImageElement.classList.add('active');
    else cardValidateMessageElement.textContent = 'Unknown payment issuer';
  } catch (e) {
    cardValidateMessageElement.textContent = e.message;
  }
});
