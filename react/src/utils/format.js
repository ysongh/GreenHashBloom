export const calculateTreeAge = (unixTimestamp) => {
  const mintDate = new Date(unixTimestamp * 1000);
  const now = new Date();
  const diffTime = Math.abs(now - mintDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears >= 1) {
    return `${diffYears} year${diffYears > 1 ? 's' : ''}`;
  } else if (diffMonths >= 1) {
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
  } else if (diffDays == 0) {
    return "Less than a day";
  } else {
    return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
  }
};
