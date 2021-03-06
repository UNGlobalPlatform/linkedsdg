const express = require('express');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const jsonld = require('jsonld');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const fs = require('fs');
const readline = require('readline');

const util = require('util');
let schMapping = require('./schema/schema-mapping')
let objects = require('./database/exampleObjects')

const DatabaseInterface = require('./database/database');
const schemaString = require('./schema/schema');
const Resolver = require('./resolvers/resolvers');

const app = express();

const database = new DatabaseInterface(require('./schema/schema-mapping'));
const Warnings = []; // Warnings can be added as object to this array. Array is clear after each query.

app.use(bodyParser.json({ limit: '4000mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '4000mb', extended: true }))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready`)
);

async function init(app, index) {
    const rootResolver = new Resolver(database, Warnings, require('./schema/schema-mapping')).rootResolver; // Generate Resolvers for graphql

    schema = makeExecutableSchema({
        typeDefs: schemaString,
        resolvers: rootResolver,
    });


    server = new ApolloServer({
        schema,
        context: ({ req }) => {
            const token = req.headers.accept ? req.headers.accept : "";
            return { token };
        },
        formatResponse: (response, query, test1, test2, test3) => {
            if (response.errors !== undefined) {
                response.data = false;
            }
            else {

                if (response.data !== null && Warnings.length > 0) {
                    response["extensions"] = {}
                    response["extensions"]['Warning'] = [...Warnings];
                    Warnings.length = 0;
                }
            }
            if (response.data !== null) {

                if (query.context.token.includes( "application/ld+json" )) {
                    response.data = {
                        "@context": "https://raw.githubusercontent.com/UNStats/LOD4Stats/master/sdg-data/sdg-series-data-cubes-context.jsonld",
                        "@id": "@graph",
                        ...response.data
                    }
                } 
            }
            return response;
        },
        playground: {
            endpoint: process.env.HOST_URL + '/graphql',
            tabs: require("./tabs.js"),
          },
    });
    
    server.applyMiddleware({ app, path: '/', playgroundPath: '/' });
}

async function setDB() {



    console.log("START READING")
    const fileStream = fs.createReadStream('./database/memory.nt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.

        await database.insertRDFCashed(line, null);
    }
    console.log(`THE END SIZE: ${database.database.size}`);
    // console.log(database.getAllSub())
    // console.log(database.getAllPred())
    // for(let obj of objects){
    //     obj["@context"] = schMapping["@context"];
    //     const rdf = await jsonld.toRDF(obj, { format: 'application/n-quads' }); 
    //     await database.insertRDF(rdf, obj._id);
    // }
}

setDB();
init(app, "");
module.exports = {
    app,
};