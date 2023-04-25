import type { AWS } from '@serverless/typescript';
import createOrder from '@functions/create-order';

const serverlessConfiguration: AWS = {
  service: 'apl-order-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    region: 'eu-central-1',
    runtime: 'nodejs16.x',
    memorySize: 512,
    deploymentMethod: 'direct',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
            ],
            Resource: "arn:aws:dynamodb:eu-central-1:*:table/OrdersTable",
          }
        ]
      }
    }
  },
  functions: { createOrder },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev"
    }
  },
  resources: {
    Resources: {
      OrdersTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'APLTable',
          BillingMode: "PAY_PER_REQUEST",
          AttributeDefinitions: [
            {
              AttributeName: "PK",
              AttributeType: "S"
            },
            {
              AttributeName: "SK",
              AttributeType: "S"
            },
          ],
          KeySchema: [
            {
              AttributeName: "PK",
              KeyType: "HASH"
            },
            {
              AttributeName: "SK",
              KeyType: "RANGE"
            }
          ]
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
