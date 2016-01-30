/**
 * Created by lotem on 1/23/2016.
 */
var pshat = require('./pshat.json');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/data', function(request, response) {
    var path = 'data/' + request.param('id') + '.json';
    response.sendfile(path, {root: './public'});
});

app.get('/', function(request, response) {
    response.send('js/index', {
        dataId: request.query.id
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
