#!/usr/bin/env python3

from aws_cdk import core

from python_sample.python_sample_stack import PythonSampleStack


app = core.App()
PythonSampleStack(app, "python-sample")

app.synth()
