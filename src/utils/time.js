export const isToday = (date) => {
  const messageDate = new Date(date);
  const currentDate = new Date();

  const condition =
    messageDate.getDate() === currentDate.getDate() &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear();

  const today = messageDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (condition) {
    return today;
  } else {
    return `${today} ${messageDate.getDate().toLocaleString([], {
      minimumIntegerDigits: 2,
    })}.${(messageDate.getMonth() + 1).toLocaleString([], {
      minimumIntegerDigits: 2,
    })}`;
  }
};

export const isTodayUnix = (timestamp) => {
  const messageDate = new Date(timestamp * 1000);
  const currentDate = new Date();

  const condition =
    messageDate.getDate() === currentDate.getDate() &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear();

  const today = messageDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (condition) {
    return today;
  } else {
    return `${today} ${messageDate.getDate().toLocaleString([], {
      minimumIntegerDigits: 2,
    })}.${(messageDate.getMonth() + 1).toLocaleString([], {
      minimumIntegerDigits: 2,
    })}`;
  }
};

export const formatDate = (date) => {
  const messageDate = new Date(date);

  const formattedDate =
    messageDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }) +
    ' ' +
    messageDate.getDate().toLocaleString([], {
      minimumIntegerDigits: 2,
    }) +
    '.' +
    (messageDate.getMonth() + 1).toLocaleString([], {
      minimumIntegerDigits: 2,
    }) +
    '.' +
    messageDate.getFullYear().toString().slice(-2);

  return formattedDate;
};

export const formatDateWithDots = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
};

export const taskColor = (task) => {
  if (task?.done) return '#87CEFA';
  const messageDate = new Date(task?.endAt);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const messageDay = messageDate.getDate();
  const messageMonth = messageDate.getMonth();
  const messageYear = messageDate.getFullYear();

  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const tomorrowDay = tomorrow.getDate();
  const tomorrowMonth = tomorrow.getMonth();
  const tomorrowYear = tomorrow.getFullYear();

  const yesterdayDay = yesterday.getDate();
  const yesterdayMonth = yesterday.getMonth();
  const yesterdayYear = yesterday.getFullYear();

  if (
    messageYear === todayYear &&
    messageMonth === todayMonth &&
    messageDay === todayDay
  ) {
    return '#7AB476'; // today
  } else if (
    messageYear === tomorrowYear &&
    messageMonth === tomorrowMonth &&
    messageDay === tomorrowDay
  ) {
    return '#FFC784'; // tomorrow
  } else if (
    messageDate < yesterday ||
    messageYear < yesterdayYear ||
    (messageYear === yesterdayYear && messageMonth < yesterdayMonth) ||
    (messageYear === yesterdayYear &&
      messageMonth === yesterdayMonth &&
      messageDay < yesterdayDay)
  ) {
    return '#FF1700'; // before yesterday
  }
};

export const sleep = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

let abortController = null;

export function debounce(func, wait) {
  let timeout;

  return function (...args) {
    // Отменяем предыдущий запрос
    if (abortController) {
      abortController.abort();
    }

    // Создаем новый AbortController
    abortController = new AbortController();
    const { signal } = abortController;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, [...args, signal]);
    }, wait);
  };
}
