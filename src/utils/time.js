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
