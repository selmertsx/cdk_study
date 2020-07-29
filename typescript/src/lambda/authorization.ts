export function handler(event: any, context: any, callback: any){
  callback(null, generateAllow("me", "Allow", event.methodArn));
}

function generateAllow(principalId: string, effect: string, resource: string){
  const policyDocument = {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: resource
      }
    ]
  }

  const response = {
    principalId,
    context: {
      "sampleValue": "samplesample!"
    },
    policyDocument,
  }

  return response
}
