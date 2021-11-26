export function parseParams(object) {
  return `from=2021-06-10T13:00:06.000Z&to=2021-11-30T16:00:00.000Z&from_account_id=2&to_account_id=1&page=${object.pageIndex}&page_size=${object.pageSize}&sort_by=${object.sort_by}&order_by=${object.order_by}`;
}
