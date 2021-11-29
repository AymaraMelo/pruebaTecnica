export function parseParams(object) {
  return `from=${object.from}&to=2021-11-30T16:00:00.000Z&from_account_id=${object.from_account_id}&to_account_id=${object.to_account_id}&page=${object.pageIndex}&page_size=${object.pageSize}&sort_by=${object.sort_by}&order_by=${object.order_by}`;
}
