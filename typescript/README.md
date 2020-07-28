# cdk_study
## メモ

API Gatewayのカスタム認証にてリクエストベースのLambdaオーソライザー関数を作成する場合は、
cdk経由で設定するなら、header, query文字列、ステージ変数、コンテキストのいずれかに必ずパラメータが入っている必要がある。
consoleからやるなら、必ずしもパラメータが入っている必要はない。

```typescript
export interface RequestAuthorizerProps extends LambdaAuthorizerProps {
    /**
     * An array of request header mapping expressions for identities. Supported parameter types are
     * Header, Query String, Stage Variable, and Context. For instance, extracting an authorization
     * token from a header would use the identity source `IdentitySource.header('Authorizer')`.
     *
     * Note: API Gateway uses the specified identity sources as the request authorizer caching key. When caching is
     * enabled, API Gateway calls the authorizer's Lambda function only after successfully verifying that all the
     * specified identity sources are present at runtime. If a specified identify source is missing, null, or empty,
     * API Gateway returns a 401 Unauthorized response without calling the authorizer Lambda function.
     *
     * @see https://docs.aws.amazon.com/apigateway/api-reference/link-relation/authorizer-create/#identitySource
     */
    readonly identitySources: string[];
}
```

## 参考資料

lambdaを使ったリクエストベースのオーソライザーを作るための資料
https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html

