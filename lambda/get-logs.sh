#!/bin/bash
aws lambda invoke --function-name SmartDeviceFunction --cli-binary-format raw-in-base64-out --payload '{"key": "value"}' out
sed -i'' -e 's/"//g' out
sleep 15
aws logs get-log-events --log-group-name /aws/lambda/SmartDeviceFunction --log-stream-name $(cat out) --limit 5