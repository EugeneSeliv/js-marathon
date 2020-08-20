// Fist task start
function signsQuantity(string, sign) {
  let result = 0;
  for (let i = 0; i < string.length; i++) {
    const IthSign = string.charAt(i);
    if (IthSign === sign) result++;
  }
  return result;
}

function makeStringSearcherr(sign) {
  function stringSearcherr(firstString, secondString) {
    if (signsQuantity(firstString, sign) > signsQuantity(secondString, sign)) {
      return `В строке "${firstString}" больше символов "${sign}"`;
    } else if (signsQuantity(firstString, sign) < signsQuantity(secondString, sign)) {
      return `В строке "${secondString}" больше символов "${sign}"`;
    } else if (signsQuantity(firstString, sign) === 0 && signsQuantity(secondString, sign) === 0) {
      return `В строках отсутствует символ "${sign}"`;
    } else if (signsQuantity(firstString, sign) === signsQuantity(secondString, sign)) {
      return `В строках равное количество символов "${sign}"`;
    }
  }
  return stringSearcherr;
}

const firstRow = prompt('Введите первую строку', 'мама мыла раму');
const secondRow = prompt('Введите вторую строку', 'собака друг человека');
const sign = prompt('Введите искомый символ', 'а');

const relevantString = makeStringSearcherr(sign);

alert(relevantString(firstRow, secondRow));
// Fist task end

// Second task start
const PhoneNumber = prompt('Введите номер телефона', '+71234567890');

function checkPhoneNumber(phoneNumber) {
  const PhoneNumberLength = 12;
  if (phoneNumber.charAt(0) !== '+') {
    alert('Неверный формат номера, отсутствует "+"');
    return false;
  } else if (phoneNumber.length !== PhoneNumberLength) {
    alert('Неверная длинна номера');
    return false;
  } else return true;
}

function formattedPhone(phone) {
  let result = '+';
  for (let i = 1; i < phone.length; i++) {
    if (i === 2) {
      result += ' (';
    } else if (i === 5) {
      result += ') ';
    } else if (i === 8 || i === 10) {
      result += '-';
    }
    result += phone.charAt(i);
  }
  return result;
}


if (checkPhoneNumber(PhoneNumber)) {
  alert(`Было: ${PhoneNumber}\nСтало: ${formattedPhone(PhoneNumber)}`);
} else alert('Попробуйте еще раз');

// Second task end
