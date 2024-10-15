# Transaction prototype

## The idea of the project:

- A prototype for people that don't realy know how to make a transaction service
- A great expireance and base for future projects

## How to use? 

- Downdload git -> [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) <-
- Clone the project `git clone https://github.com/VandiDivandiLev/transaction-prototype.git`

## To test functions:
- `node tests.js`
- `npm run test`

## Classes in `transactions.js`

## Class transaction:

### constructor:

####  Information:

- Creating a new transactiom request

#### Using:

- `var transaction_request = New transaction(requst_id, sender_id, resiver_id, sender_password, resiver_password, amount, currency, server_id, server_password)`

### Payment:

#### Information:

- Pay function to use a transactiom request

#### Using:

- `transaction_request.payment()`

#### Information:

- Creating a new transaction between two users

## Class transaction_error:

### Constructor:

#### Information:

- Created a custom error

#### Using:

- `var error = new transaction_error("SomeName", "Some Message", 202)`

## Other classes:

### Information

- Classes user and server (also classes with _error for cuastom errors in this classes) are prototypes of real classes
- If you want to use my code ad database, user and server (optionl) logic
- The functions in this classes are only showcases how could you create safe and easy logic

## Testing in `tests.js`

- I've made standart tests for my prototype

### Object `testCases`:

- It's a list of different test cases for tedtiong the transaction class
- You can add more cases if you use my code

### Fuction `testTransaction`:

- A functon that runs the tests
- It's using for to go through every element in testCases and tells about the result and expection

## Thats it! Thanks for reading 

