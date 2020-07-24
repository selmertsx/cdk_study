# __future__ って何を使ってるんだろ？
from __future__ import print_function

import json
import uuid
from decimal import Decimal
import os
import boto3

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
    response = table.put_item(
        Item={
            "id": str(uuid.uuid4())
        }
    )
    print("PutItem succeeded:")
    # こいつは悪さしてるみたいだ
    # print(json.dumps(response, indent=4, cls="DecimalEncoder"))
    return { "statusCode": 200 }
