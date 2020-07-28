export function handler(event: any, context: any, callback: any){
  // Parse the input for the parameter values
  var tmp = event.methodArn.split(':');
  var apiGatewayArnTmp = tmp[5].split('/');
  var resource = '/'; // root resource
  if (apiGatewayArnTmp[3]) {
      resource += apiGatewayArnTmp[3];
  }

  callback(null, generateAllow("me", "Allow", resource));
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
    context: {
      "sampleValue": "samplesample!"
    },
    policyDocument,
  }
  return response
}
