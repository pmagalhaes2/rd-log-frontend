export const formatTime = (time) => {
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}:00`;
};
