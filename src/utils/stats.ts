import { StatsLineChart } from '../@types/stats';

export function getMaxNumber(dataChart: StatsLineChart, min = 50, margin = 0) {
  let number = min;

  dataChart.forEach((set) => {
    set.data.forEach((dat) => {
      const num = dat.y;
      if (num > number) {
        number = num;
      }
    });
  });

  return number + margin;
}
