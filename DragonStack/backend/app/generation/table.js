const pool = require('../../databasePool');

class GenerationTable {
    static storeGeneration(generation) { //static function bcz dont want make instance table
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO generation(expiration) VALUES($1) RETURNING id', //starting at 1 not at zero!!!
                [generation.expiration],
                (error, response) => {
                    if(error) return reject(error);
    
                    const generationId = response.rows[0].id;

                    resolve({ generationId });
                }
            );
        });
    }
}

module.exports = GenerationTable;