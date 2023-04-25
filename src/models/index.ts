import { DynamoDB } from "aws-sdk";

export default function createDynamoDBClient(): DynamoDB {
  if (process.env.IS_OFFLINE) {
    return new DynamoDB({
      region: "localhost",
      endpoint: "http://localhost:5000",
    });
  }

  return new DynamoDB();
}
