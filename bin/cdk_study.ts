#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CdkStudyStack } from '../lib/cdk_study-stack';

const app = new cdk.App();
new CdkStudyStack(app, 'CdkStudyStack');
