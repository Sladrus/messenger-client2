export function chatCount(num) {
  const lastDigit = num % 10;
  if (lastDigit === 1 && num !== 11) {
    return 'чат';
  } else if ([2, 3, 4].includes(lastDigit) && (num < 10 || num > 20)) {
    return 'чата';
  } else {
    return 'чатов';
  }
}

export function orderCount(num) {
  const lastDigit = num % 10;
  if (lastDigit === 1 && num !== 11) {
    return 'заявка';
  } else if ([2, 3, 4].includes(lastDigit) && (num < 10 || num > 20)) {
    return 'заявки';
  } else {
    return 'заявок';
  }
}


export function unreadCount(array) {
  const filteredArray = array?.filter((item) => item.unreadCount > 0);
  return filteredArray?.length || 0;
}

export function getMessageEnding(count) {
  if (count % 10 === 1 && count !== 11) {
    return 'сообщение';
  } else if (count % 10 >= 2 && count % 10 <= 4 && (count < 5 || count > 20)) {
    return 'сообщения';
  } else {
    return 'сообщений';
  }
}

export function isMessageType(type) {
  if (type === 'task') {
    return 'Новая задача';
  }
  if (type === 'event') {
    return 'Новое событие';
  }
  if (type === 'Photo') {
    return 'Фото';
  }
  if (type === 'document') {
    return 'Документ';
  }
}

export function gradeType(grade) {
  if (grade === 'low') return 'Плохо';
  if (grade === 'middle') return 'Нормально';
  if (grade === 'high') return 'Хорошо';
}
