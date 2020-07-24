# memo

とりあえず pythonのコードでdeployまでやった。
requirements.txt って何の役割を果たしているんだろ？
次は DynamoDBを動かしてみよう。

ここにpythonのサンプルコードがあるので参照してみると良さそう。
https://github.com/aws-samples/aws-cdk-examples/tree/master/python

local環境でのテストは下記のコードを使って行う
https://github.com/localstack/localstack

setup.py の設定について
https://qiita.com/Tadahiro_Yamamura/items/2cbcd272a96bb3761cc8

既存リソースの取り込みについて
https://dev.classmethod.jp/articles/cdk-existing-resource/

__future__ の使い方について
https://docs.python.org/ja/3/library/__future__.html


printのclsって何に使うんだろ？

```python
print(json.dumps(i, cls=DecimalEncoder))
```
