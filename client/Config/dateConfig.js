 const formatRelativeDate = (mysqlDateString) => {
    const jsDateObject = new Date(mysqlDateString);
    const currentDate = new Date();
    const timeDifference = currentDate - jsDateObject;
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    if (hoursDifference < 24) {
      return `${hoursDifference} hours ago`;
    } else if (daysDifference < 7) {
      return `${daysDifference} days ago`;
    } else {
      return jsDateObject.toLocaleString('ar', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      });
    }
  };
  
export default formatRelativeDate;