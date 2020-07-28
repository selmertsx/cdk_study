import cdk = require('@aws-cdk/core');
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from "@aws-cdk/aws-apigateway"
import { Duration } from '@aws-cdk/core';


export class CdkStudyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const authorizerFunction = new lambda.Function(this, "cdkStudyAuthFunction", {
      code: lambda.Code.asset("src/lambda"),
      handler: "authorization.handler",
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: Duration.seconds(20)
    })

    const auth = new apigateway.RequestAuthorizer(this, "sampleAuthorizer", {
      handler: authorizerFunction,
      identitySources: [apigateway.IdentitySource.header("Authorization")]
    })

    const backendFunction = new lambda.Function(this, "cdkStudyBackendFunction", {
      code: lambda.Code.asset("src/lambda"),
      handler: "backend.handler",
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: Duration.seconds(20)
    });
    const backendIntegration = new apigateway.LambdaIntegration(backendFunction);

    const api = new apigateway.RestApi(this , "sample-api", {
      restApiName: "Authorization Sample",
      defaultMethodOptions: {
        authorizationType: apigateway.AuthorizationType.CUSTOM,
        authorizer: auth
      }
    });

    const samples = api.root.addResource('samples');
    samples.addMethod('GET', backendIntegration)
  }
}
