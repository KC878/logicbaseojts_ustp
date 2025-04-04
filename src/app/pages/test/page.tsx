import generateTransactionsID from '@src/utils/generateTransactionID'

export default function TestPage() {
  return(

    <h1> {generateTransactionsID()} </h1>
  );
}