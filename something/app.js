'use strict';

const Hapi = require('hapi');
const Good = require('good');
const server = new Hapi.Server();

const Path = require('path');
const Hoek = require('hoek');

server.register(require('vision'), function (err) {
    Hoek.assert(!err, err);
    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'public/html'
    });
});

server.connection({
    host: "localhost",
    port: 3000,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});
server.register(require('inert'),function (err){
    if (err) {
        throw err;
    }
});
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index', {title: "Best wish for Vera"});
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, function (err) {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function (err) {

        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});