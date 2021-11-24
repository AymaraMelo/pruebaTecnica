import * as constants from '../../utils/constants';

export default {
  loading: false,
  error: false,
  userTransactions: [],
  createdTransaction: null,
  pagination: {
    hasMorePages: false,
    pageSize: constants.DEFAULT_PAGE_SIZE,
    currentPage: constants.DEFAULT_PAGE_INDEX,
    totalRows: 0,
    totalPages: 0,
  },
};
