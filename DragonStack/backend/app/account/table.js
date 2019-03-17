const pool = require('../../databasePool');

class AccountTable {
    static storeAccount({ usernameHash, passwordHash }) { //static function bcz dont want make instance table
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO account("usernameHash", "passwordHash") VALUES($1, $2)', //starting at 1 not at zero!!!
                [usernameHash, passwordHash],
                (error, response) => {
                    if(error) return reject(error);
    
                    resolve();
                }
            );
        });
    }


    static getAccount({ usernameHash }) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT id, "passwordHash", "sessionId" FROM account WHERE "usernameHash" = $1',
                [usernameHash],
                (error, response) => {
                    if(error) return reject(error);

                    resolve({ account: response.rows[0] });
                }
            )
        });
    }


    static updateSessionId({ sessionId, usernameHash }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'UPDATE account SET "sessionId" = $1 WHERE "usernameHash" = $2',
                [sessionId, usernameHash],
                (error, response) => {
                    if(error) return reject(error);

                    resolve();
                }
            )
        });
    }
}

module.exports = AccountTable;