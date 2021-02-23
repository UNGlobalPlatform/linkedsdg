const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const DatabaseInterface = require('../../../database/database');
const database = new DatabaseInterface();
const Resolver = require('../../resolvers');
const rootResolver = new Resolver(database).rootResolver;
const schemaString = require('../../../schema/schema');
const schemaMapping = require('../../../schema/schema-mapping');

const schema = makeExecutableSchema({
    typeDefs: schemaString,
    resolvers: rootResolver,
    customFormatErrorFn: error => {
        const { code, message } = error.originalError;
        return { code, message };
    }
});

afterEach(() => {
    database.drop();
});



describe('My Test Cases for query resolvers', () => {
    const CreateOrganizationQuery = `
    mutation{
        Organization(type: INSERT, input: {
        _id: "http://subject"
        _type: Organization
        legalName: {
            _value: "Nazwa firmy"
            _type: Text
        }
        employee: {
            _type: Person
            _id: "http://data/bluesB"
        }
        shareholderOf:{
            _type: Organization
            _id: "http://data/bluesB"
        }
        noOfEmployees: {
            _type: Integer
            _value: "0"
        }
        })
        Person(type: INSERT, input: {
            _id: "http://data/bluesB"
            name: {
                _value: "Adam"
                _type: Text
            }
            })
    }

      
    `;


    const Query = `
    {
        Organization{
          _id
          employee{
            _id
            _type
            name{
              _value
            }
          }
           shareholderOf{
          __typename
          ...on Organization{
            _id
            name{
              _value
            }
          }
        }   
        }
      }
    `

    test("Create Test", async () => {
        let result = await graphql(schema, CreateOrganizationQuery, null, null, null);

        result = await graphql(schema, Query, null, null, null);
        // Create
        const expected = {
            "data": {
              "Organization": [
                {
                  "_id": "http://subject",
                  "employee": [
                    {
                      "_id": "http://data/bluesB",
                      "_type": [
                        "http://schema.org/Person"
                      ],
                      "name": {
                        "_value": "Adam"
                      }
                    }
                  ],
                  "shareholderOf": [
                    {
                      "__typename": "Organization",
                      "_id": "http://data/bluesB",
                      "name": {
                        "_value": "Adam"
                      }
                    }
                  ]
                }
              ]
            }
          }

        expect(result).toEqual(expected);
        
    });



})

