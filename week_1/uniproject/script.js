const fs        = require('fs');
const github    = require('./githib/script');

github.getAllGithubRepositoryCollection('mihail-petrov', (data) => {

    for(var element in data) {
        console.log(data[element]);
        //fs.mkdirSync(`projects/${data[element].name}`, { recursive : true });
    }
});

// * get all repository from endpoint
// * execute git clone 
// * create dyrectrory
// * store all directories