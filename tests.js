const { transaction, transaction_error, user, user_error, server, server_error } = require('./transaction'); // Adjust path if needed

const testCases = [
    {
        description: 'Valid Transaction',
        transactionData: {
            sender_id: 123,
            receiver_id: 456,
            amount: 50,
            currency: 'USD'
        },
        expectedError: null, // No error expected
        expectedCode: 202,
        expectedName: 'SucsesfullTransaction'
    },
    {
        description: 'Invalid Amount (Zero)',
        transactionData: {
            sender_id: 123,
            receiver_id: 456,
            amount: 0,
            currency: 'USD'
        },
        expectedError: transaction_error,
        expectedCode: 400,
        expectedName: 'UndifinedAmount'
    },
    {
        description: 'Invalid Currency (Empty)',
        transactionData: {
            sender_id: 123,
            receiver_id: 456,
            amount: 50,
            currency: ''
        },
        expectedError: transaction_error,
        expectedCode: 400,
        expectedName: 'UndifinedCurrency'
    },
    {
        description: 'Insufficient Funds',
        transactionData: {
            sender_id: 123,
            receiver_id: 456,
            amount: 150, // More than sender's balance
            currency: 'USD'
        },
        expectedError: transaction_error,
        expectedCode: 400, // Assuming 'NotEnougthMoney' throws code 400
        expectedName: 'NotEnougthMoney'
    },
    // ... Add more test cases ...
];

async function testTransaction() {
    for (const testCase of testCases) {
        console.log(`\nTest: ${testCase.description}`);
        try {
            const testTransaction = new transaction(
                new Date(), // Request ID
                testCase.transactionData.sender_id,
                testCase.transactionData.receiver_id,
                'test_sender_password', // Sender password
                'test_receiver_password', // Receiver password
                testCase.transactionData.amount,
                testCase.transactionData.currency,
                789, // Server ID
                'test_server_password' // Server password
            );

            const result = await testTransaction.payment();
            if (testCase.expectedError === null) {
                console.log(`Result code => ${result.code}, ${testCase.expectedCode} <= expected.code`);
                console.log(`Result name => ${result.name}, ${testCase.expectedName} <= expected.name`);
                console.log('Test passed!');
            } else {
                console.log(`Test failed! Expected error but none occurred.`);
            }
        } catch (error) {
            if (testCase.expectedError && error instanceof testCase.expectedError) {
                console.log(`Result code => ${error.code}, ${testCase.expectedCode} <= expected.code`);
                console.log(`Result name => ${error.name}, ${testCase.expectedName} <= expected.name`);
                console.log('Test passed!');
            } else {
                console.log(`Test failed! Expected error of type ${testCase.expectedError.name} but got ${error.name}.`);
            }
        }
    }
}

testTransaction();