'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: event.pathParameters.id,
            name: data.name,
            description: data.description,
            rating: data.rating,
            updatedAt: timestamp,
        }
    };

    dynamoDb.put(params, (error, result) => {
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
            body: JSON.stringify(result.Attributes),
        };
        callback(null, response);
    });
};
