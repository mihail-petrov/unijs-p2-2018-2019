const http = require('https');

const githubEndpoint = 'https://api.github.com';

const getAllGithubRepositoryCollection = function(githubHandler, callback) {
    
    var requestEndpoint = `${githubEndpoint}/users/${githubHandler}/repos`;

    const requestParameterCollection = {
        headers : {
            'User-Agent' : 'Test User Agent'
        }
    };

    var requestStreamCollection = [];
    var responseObject          = null;

    // 11.+
    http.get(requestEndpoint, requestParameterCollection,  function(res) {
        
        res.on('data', function(chunk) {
            requestStreamCollection.push(chunk);
        });
        
        res.on('end', function() {

            responseObject = JSON.parse(requestStreamCollection.join(''));
            callback(responseObject);
        });
    });
};


module.exports = {
    getAllGithubRepositoryCollection
}