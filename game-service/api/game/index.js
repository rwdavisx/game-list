'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = {
    gameRead: async (event, context, callback) => {
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                id: event.pathParameters.id,
            },
        };
        dynamoDb.get(params, (error, result) => {
            if (error) {
                console.error(error);
                callback(null, {
                    statusCode: error.statusCode || 501,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Couldn\'t fetch the game.',
                });
                return;
            }

            const response = {
                statusCode: 200,
                body: JSON.stringify(result.Game),
            };
            callback(null, response)
        });
    },
    gameCreate: async (event, context, callback) => {
        const timestamp = new Date().getTime();
        const data = JSON.parse(event.body);
        if (typeof data.name !== 'string') {
            console.error('Validation Failed');
            callback(null, {
                statusCode: 400,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t create the game.',
            });
            return
        }
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Game: {
                id: uuid.v1(),
                name: data.name,
                description: data.description,
                rating: data.rating,
                createdAt: timestamp,
                updatedAt: timestamp,
            },
        };
        dynamoDb.put(params, (error) => {
            if (error) {
                console.error(error);
                callback(null, {
                    statusCode: error.statusCode || 501,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Couldn\'t create the game.',
                });
                return;
            }

            const response = {
                statusCode: 200,
                body: JSON.stringify(params.Game),
            };
            callback(null, response);
        });
    },
    gameUpdate: async (event, context, callback) => {
        const timestamp = new Date().getTime();
        const data = JSON.parse(event.body);
        if (typeof data.name !== 'string' || typeof data.description !== 'string' | typeof data.rating !== 'number') {
            console.error('Validation Failed');
            callback(null, {
                statusCode: 400,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t update the game.',
            });
            return;
        }

        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                id: event.pathParameters.id,
            },
            ExpressionAttributeNames: {
                '#game_name': 'name',
            },
            ExpressionAttributeValues: {
                ':name': data.text,
                ':description': data.description,
                ':rating': data.rating,
                ':updatedAt': timestamp,
            },
            UpdateExpression: 'SET #game_name = :name, description = :description, rating = :rating, updatedAt = :updatedAt',
            ReturnValues: 'ALL_NEW',
        };

        dynamoDb.update(params, (error, result) => {
            if (error) {
                console.error(error);
                callback(null, {
                    statusCode: error.statusCode || 501,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Couldn\'t fetch the game item.',
                });
                return;
            }

            const response = {
                statusCode: 200,
                body: JSON.stringify(result.Attributes),
            };
            callback(null, response);
        });
    },
    gameDelete: async (event, context, callback) => {
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                id: event.pathParameters.id,
            },
        };

        dynamoDb.delete(params, (error) => {
            if (error) {
                console.error(error);
                callback(null, {
                    statusCode: error.statusCode || 501,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Couldn\'t remove the game.',
                });
                return;
            }

            const response = {
                statusCode: 200,
                body: JSON.stringify({}),
            };
            callback(null, response);
        });
    },
    gameList: async (event, context, callback) => {
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
        };
        dynamoDb.scan(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error(error);
                callback(null, {
                    statusCode: error.statusCode || 501,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Couldn\'t fetch the games.',
                });
                return;
            }

            // create a response
            const response = {
                statusCode: 200,
                body: JSON.stringify(result.Games),
            };
            callback(null, response);
        });
    }
};