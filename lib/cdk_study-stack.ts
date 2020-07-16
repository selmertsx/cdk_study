import cdk = require('@aws-cdk/core');
import * as lambda from '@aws-cdk/aws-lambda';
import { Duration } from '@aws-cdk/core';


export class CdkStudyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  }
}
