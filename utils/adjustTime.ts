export const adjustTime = (time: number) => {
  const day = Math.floor(time / (24 * 60 * 60));
  time -= day * (24 * 60 * 60);
  const hour = Math.floor(time / (60 * 60));
  time -= hour * 60 * 60;
  const minute = Math.floor(time / 60);
  time -= minute * 60;
  const second = Math.floor(time);
  return (
    "Remaining Time: " +
    (day > 0 ? day.toString() + "d " : "") +
    (hour > 0 ? hour.toString() + "h " : "") +
    (minute > 0 ? minute.toString() + "m " : "") +
    (second > 0 ? second.toString() + "s" : "")
  );
};
