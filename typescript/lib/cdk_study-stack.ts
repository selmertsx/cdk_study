import cdk = require('@aws-cdk/core');
import * as lambda from '@aws-cdk/aws-lambda';
import { Duration } from '@aws-cdk/core';


export class CdkStudyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.Function(this, "cdkStudyLambda", {
      code: lambda.Code.asset("src/lambda"),
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: Duration.seconds(20)
    });
  }
}
