import { watchAuth } from './auth/authSagas';
import { watchUser } from './user/userSagas';
import { watchNewTransaction, watchGetTransaction } from './transactions/transactionsSagas';

const sagas = [watchAuth(), watchUser(), watchNewTransaction(), watchGetTransaction()];

export default sagas;
