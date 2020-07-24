from aws_cdk import (
    core,
    aws_lambda,
    aws_dynamodb,
    aws_apigateway
)

class PythonSampleStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)
        demo_table = aws_dynamodb.Table(
            self,
            "demo_table",
            partition_key=aws_dynamodb.Attribute(
                name="id",
                type=aws_dynamodb.AttributeType.STRING
            )
        )

        producer_lambda = aws_lambda.Function(
            self,
            "producer_lambda_function",
            runtime=aws_lambda.Runtime.PYTHON_3_6,
            handler="handler.main",
            code=aws_lambda.Code.asset(path="./lambda/producer")
        )
        producer_lambda.add_environment("TABLE_NAME", demo_table.table_name)
        demo_table.grant_write_data(producer_lambda)

        consumer_lambda = aws_lambda.Function(
            self,
            "consumer_lambda_function",
            runtime=aws_lambda.Runtime.PYTHON_3_6,
            handler="handler.main",
            code=aws_lambda.Code.asset(path="./lambda/consumer")
        )

        consumer_lambda.add_environment("TABLE_NAME", demo_table.table_name)
        demo_table.grant_read_data(consumer_lambda)
        base_api = aws_apigateway.RestApi(self, "PythonApiGateway", rest_api_name="PythonApiGateway")
        example_entity = base_api.root.add_resource("example")
        example_entity_lambda_integration = aws_apigateway.LambdaIntegration(
            consumer_lambda,
            proxy=False,
            integration_responses=[
                {
                    "statusCode": "200",
                    "responseParameters": {
                        'method.response.header.Access-Control-Allow-Origin': "'*'",
                    }
                }
            ]
        )

        example_entity.add_method(
            "GET",
            example_entity_lambda_integration,
            method_responses=[{
                'statusCode': '200',
                'responseParameters': {
                    'method.response.header.Access-Control-Allow-Origin': True,
                }
            }]
        )

        producer_lambda_integration = aws_apigateway.LambdaIntegration(
            producer_lambda,
            proxy=False,
            integration_responses=[
                {
                    "statusCode": "200",
                    "responseParameters": {
                        'method.response.header.Access-Control-Allow-Origin': "'*'",
                    }
                }
            ]
        )

        example_entity.add_method(
            "POST",
            producer_lambda_integration,
            method_responses=[{
                'statusCode': '200',
                'responseParameters': {
                    'method.response.header.Access-Control-Allow-Origin': True,
                }
            }]
        )
