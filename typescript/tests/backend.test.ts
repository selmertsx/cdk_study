import { handler } from "../src/lambda/authorization"

// Mocked Events
import { AuthorizerEvent } from "./events/authorizer";

const callback = (error: any, result: any) => {
  return new Promise((resolve:any, reject:any) => {
    error ? reject(error) : resolve(result)
  })
}

test("handler", async() => {
  const event = AuthorizerEvent;
  const response = await handler(event, {}, callback);
  const expected = {
    "principalId": "me",
    "context": {
        "sampleValue": "samplesample!"
    },
    "policyDocument": {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": "execute-api:Invoke",
                "Effect": "Allow",
                "Resource": "arn:aws:execute-api:us-east-1:123456789012:/prod/POST/{proxy+}"
            }
        ]
    }
};

  expect(response).toEqual(expected);
});
