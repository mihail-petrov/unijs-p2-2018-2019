const fs = require('fs');
const ARTEFACT_PATH = './db/artefacts';

const generateId = () => {
    return Math.random().toString(36).substring(2, 10);
};


var Database = function() {

    if(!fs.existsSync(ARTEFACT_PATH)) {
        fs.mkdirSync(ARTEFACT_PATH);
    }
};

Database.prototype.select = function(document, whereCollection) {

    var rawDatabaseCollection       = (fs.readFileSync(`${ARTEFACT_PATH}/${document}`)).toString();
    var parsedDatabaseCollection    = rawDatabaseCollection.split('\n');
    var collection                  = [];

    // Fix the last new line 
    for(var i = 0; i < parsedDatabaseCollection.length - 1; i++) {

        var documentEntity = JSON.parse(parsedDatabaseCollection[i]);

        if(whereCollection) {

            for(var index in whereCollection) {
            
                if(documentEntity[index] == whereCollection[index]) {
                    collection.push(documentEntity);
                }
            }
        }   
        else {
            collection.push(documentEntity);
        }
    }

    return collection;
};

Database.prototype.insert = function(document, object) {

    // generate id
    var __id = generateId();

    // stringify document object
    var processEntity = object;
    processEntity.__id = __id;

    var storeEntity = JSON.stringify(processEntity) + '\n';

    // insert into proper document
    fs.writeFileSync(`${ARTEFACT_PATH}/${document}`, storeEntity, {
        flag : 'a'
    });

    return processEntity;
};

module.exports = new Database();