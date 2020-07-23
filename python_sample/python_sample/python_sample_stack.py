from aws_cdk import (
    core,
    aws_lambda,
    aws_apigateway
)

class PythonSampleStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)
        handler = aws_lambda.Function(
            self,
            "backend",
            runtime=aws_lambda.Runtime.PYTHON_3_8,
            handler="handler.main",
            code=aws_lambda.AssetCode(path="./lambda")
        )

        aws_apigateway.LambdaRestApi(self, "SampleLambda", handler=handler)
