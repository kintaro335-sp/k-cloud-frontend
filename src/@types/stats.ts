export enum GROUPFILTER {
  ACTION = 'action',
  STATUS = 'status',
  RESAON = 'reason'
}

export enum TIMEOPTION {
  TODAY = 'today',
  LAST7DAYS = '7days',
  THISMONTH = 'thismonth',
  LAST30DAYS = '30days',
  CUSTOM = 'custom'
}

export interface LogR {
  date: number;
  route: string;
  statusCode: string;
  method: string;
}

export type StatsLineChart = SerieLineChart[];

export interface SerieLineChart {
  id: string;
  data: DataLineChart[];
}

export interface DataLineChart {
  x: string;
  y: number;
}
