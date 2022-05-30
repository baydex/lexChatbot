aws rol: ubi-lex-chatbotdemo-role-y2esl7aw
lambda: ubi-lex-chatbotdemo
arn: arn:aws:lambda:us-east-1:050735028621:function:ubi-lex-chatbotdemo
lex rol: AWSServiceRoleForLexV2Bots_0S9YZHGVGWB

zip -r skills.zip . -x *.git* src/**\* node_modules/typescript\**/* aws/**\* *.zip

aws lambda update-function-code --function-name  ubi-lex-chatbotdemo --zip-file fileb://skills.zip
aws lambda invoke --function-name ubi-lex-chatbotdemo out --log-type Tail
aws lambda invoke --function-name ubi-lex-chatbotdemo out --log-type Tail --query 'LogResult' --output text |  base64 -d





    