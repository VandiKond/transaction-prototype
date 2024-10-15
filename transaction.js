
class transaction {
    /**
     * Creating a transaction request
     * @param {Date} requst_id - The Id and date of request
     * @param {number} sender_id - Id (ID or UID or UUID) of sender 
     * @param {number} resiver_id - Id (ID or UID or UUID) of resiver
     * @param {string} sender_password - The password for sender
     * @param {string} resiver_password - The password for resiver
     * @param {number} amount - The sending amount
     * @param {string} currency - The sending currency
     * @param {number} server_id - Id of a server
     * @param {string} server_password - Password ore password cache of server
     */
    constructor(requst_id = new Date(), sender_id = -1, resiver_id = -1, sender_password, resiver_password, amount, currency, server_id, server_password) {
        // Checking the amount 
        if (isNaN(amount) || amount <= 0/* You can change the maximum amount */) {
            console.log(isNaN(this.amount), this.amount <= 0, this)
            throw new transaction_error("UndifinedAmount", "Amount should be a natural number", 400)
        }
        // Checking the currency 
        if (!currency /* You can add some limits for the currency */) {
            throw new transaction_error("UndifinedCurrency", "Cyrrency should be allowed by the server and not undefined", 400)
        }
        // Creating a id for the request
        this.requst_id = requst_id

        // Creating id's for the resiver and sender
        this.resiver_id = resiver_id
        this.sender_id = sender_id

        // Creating passwords for the resiver and sender (you can use cache for the passwords)
        this.resiver_password = resiver_password
        this.sender_password = sender_password

        // Creating payment data (currency and amount)
        this.currency = currency
        this.amount = amount

        // Server data (You can skip thi part i you don't need it)
        this.server = new server(server_id, server_password)
        this.server_password = server_password
    }

    /**
     * Creating a new transaction
     * @returns {transaction_error} - A response with name, message, code
     */
    async payment() {
        // Double-check for the data
        if (!this.amount || this.amount <= 0 /* You can change the maximum amount */) {
            throw new transaction_error("UndifinedAmount", "Amount should be a natural number", 400)
        }
        if (!this.currency /* You can add some limits for the currency */) {
            throw new transaction_error("UndifinedCurrency", "Cyrrency should be allowed by the server and not undefined", 400)
        }

        // Reconnecting to the server
        const server_conection = this.server.checkConnection()

        // Connecting to sender and resiver
        const sender_connection = new user(this.sender_id, this.sender_password)
        const resiver_conection = new user(this.resiver_id, this.resiver_conection)


        // Getting sender balance
        const sender_balance = user.getUserBalance(this.sender_id, this.currency)
        const sender_amount = sender_balance - this.amount

        // Checking the balance of sender
        if (sender_amount < 0) {
            throw new transaction_error("NotEnougthMoney", `User ${this.sender_id} has not enougth money`, 400)
        }
        // Editing the senders balance
        sender_connection.replaceMoney(sender_amount, this.currency, this.sender_password)

        // Getting resiver balance
        const resiver_balance = user.getUserBalance(this.resiver_id, this.currency)
        const resiver_amount = resiver_balance + this.amount

        // Editing the resiver balance
        resiver_conection.replaceMoney(resiver_amount, this.currency, this.resiver_password)
        
        // Return
        return new transaction_error("SucsesfullTransaction", `Transaction between ${this.sender_id} and ${this.resiver_id} of ${this.amount} ${this.currency}`, 202)
    }
    
}

class transaction_error extends Error {
    constructor(name = "UnexpectedError", message = "Unexpected Error", code = 400) {
        super(name, message, code)
        this.name = name
        this.code = code
        this.message = message
    }
}

class user  {
    /**
     * Replacing mondey
     * @param {number} replaceAmount - New user balance
     * @param {string} currency - The currncy for replacement
     * @param {string} user_password - The password for user
     * @returns {user_error} - A response with name, message, code
     */
    replaceMoney(replaceAmount, currency, user_password) {
        // Make your logic to send money

        // Checking the password
        if (!user.checkPassword(this.user_id, user_password)) {
            throw new user_error('InvalidPassword', 'Invalid user password', 401);
        }
        const user_conection = this.checkConnection()

        // Place your logic here 
        return new user_error("Replaced", `Replaced ${this.user_id} to  ${replaceAmount} ${currency}`, 202)

    }
    /**
     * Checks the conection with a user
     * @returns {user_error} - A response with name, message, code
     */
    checkConnection() {
        // You can realize a checking conection to an user logic
        if (this.date > new Date(new Date() - (1000*60*60*10)) /* Make youre logic here */) {
            return new user_error("UserStillConeced", `Connected to user ${this.user_id}`, 202)
        } else {
            throw new user_error("TimeOut", `Connected to user ${this.user_id} failed`, 408)
        }
        
    }
    /**
     * Checks the password of a user
     * @param {number} user_id - Id (ID or UID or UUID) of user
     * @param {string} user_password - Password ore password cache of user
     * @returns {boolean} - Is the password correct
     */
    static checkPassword(user_id, user_password) {
        // You can realize a checking user password logic here
        if (true === true/* Make youre logic here */) {
            return true
        } else {
            return false
        }
    }
    /**
     * Connects to a user
     * @param {number} user_id - Id (ID or UID or UUID) of user
     * @param {string} user_password - Password ore password cache of user
     * @returns {user_error} - A response with name, message, code
     */
    static connectToUser(user_id, user_password) {
        // You can realize a connecting user logic
        if (true === true/* Make youre logic here */) {
            return new user_error("UserConnected", `Connected to user ${user_id}`, 202)
        } else {
            throw new user_error("ServerNotConnected", `Connected to user ${user_id} failed`, 406)
        }
    }
    /**
     * Gets the balance of a user
     * @param {number} user_id - Id (ID or UID or UUID) of user
     * @param {string} user_password - Password ore password cache of user
     * @returns {user_error} - A response with name, message, code
     */
    static getUserBalance(user_id, currency) {
        // You can realize a getting user balance logic
        if (true === true /* Make youre logic here */) {
            return 100
        } else {
            throw new user_error("UserNotFound", `User ${user_id} not found`, 404)
        } 
    }
    /**
     * Creating a user conection
     * @param {number} user_id - Id (ID or UID or UUID) of user
     * @param {string} user_password - Password ore password cache of user
     */
    constructor(user_id, user_password) {
        // Checking the password
        if (!user.checkPassword(user_id, user_password)) {
            throw new user_error('InvalidPassword', 'Invalid user password', 401);
        }
        // Conecting to the server
        const user_conection = user.connectToUser(user_id, user_password)

        // Conection data
        this.user_id = user_id;
        this.date = new Date()

        // You can realize some other server conection data
    }
}

class user_error extends Error {
    constructor(name = "UnexpectedError", message = "Unexpected Error", code = 400) {
        super(name, message, code)
        this.name = name
        this.code = code
        this.message = message
    }
}

class server {
    /**
     * Checks the conection with a server
     * @returns {server_error} - A response with name, message, code
     */
    checkConnection() {
        // You can realize a checking conection to a server logic
        if (this.date > new Date(new Date() - (1000*60*60*10)) /* Make youre logic here */) {
            return new server_error("ServerStillConeced", `Connected to server ${this.server_id}`, 202)
        } else {
            throw new server_error("TimeOut", `Connected to server ${this.server_id} failed`, 408)
        }
        
    }
    /**
     * Connects to a server
     * @param {number} server_id - Id of a server
     * @param {string} server_password - Password ore password cache of server
     * @returns {server_error} - A response with name, message, code
     */
    static connectServer(server_id, server_password) {
        // You can realize a conection to a server logic
        if (true === true/* Make youre logic here */) {
            return new server_error("ServerConnected", `Connected to server ${server_id}`, 202)
        } else {
            throw new server_error("ServerNotConnected", `Connected to server ${server_id} failed`, 406)
        }
    }
    /**
     * Checks the password of a server
     * @param {number} server_id - Id of a server
     * @param {string} server_password - Password ore password cache of server
     * @returns {boolean} - Is the password correct
     */
    static checkPassword(server_id, server_password) {
        // You can realize a checking server password logic here
        if (true === true/* Make youre logic here */) {
            return true
        } else {
            return false
        }
    }
    /**
     * Creating a server conection
     * @param {number} server_id - Id of a server
     * @param {string} server_password - Password ore password cache of server 
     */
    constructor(server_id, server_password) {
        // Checking the password
        if (!server.checkPassword(server_id, server_password)) {
            throw new server_error('InvalidPassword', 'Invalid server password', 401);
        }
        // Conecting to the server
        const server_conection = server.connectServer(server_id, server_password)

        // Conection data
        this.server_id = server_id;
        this.date = new Date()

        // You can realize some other server conection data
    }
}

class server_error extends Error {
    constructor(name = "UnexpectedError", message = "Unexpected Error", code = 500) {
        super(name, message, code)
        this.name = name
        this.code = code
        this.message = message
    }
}

module.exports = {transaction, transaction_error, user, user_error, server, server_error}