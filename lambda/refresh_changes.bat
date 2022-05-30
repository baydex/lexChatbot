call npm run build-ts 
bash -c "zip -r skills.zip . -x *.git* src/**\* node_modules/typescript\**/* aws/**\* *.zip"
call aws lambda update-function-code --function-name  SmartDeviceFunction --zip-file fileb://skills.zip
