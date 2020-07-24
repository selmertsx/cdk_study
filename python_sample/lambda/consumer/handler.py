from __future__ import print_function

import json
from decimal import Decimal
import os
import boto3
from botocore.exceptions import ClientError

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

dynamodb = boto3.resource("dynamodb")
TABLE_NAME = os.environ["TABLE_NAME"]

def main(event, context):
    table = dynamodb.Table(TABLE_NAME)
    try:
        response = table.scan()
    except ClientError as e:
        print(e.response["Error"]["Message"])
    else:
        for i in response["Items"]:
            print(json.dumps(i, cls=DecimalEncoder))
    return { "statusCode" : 200 }
