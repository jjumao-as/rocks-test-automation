#!/bin/bash

# Define the webhook URL
webhook_url="https://cliq.zoho.com/company/840183019/api/v2/channelsbyname/testreport/message?zapikey=1001.c216d7a90e9ef3cd442b476e00cfb29c.32feabe60b35fde7e6836c5cadf63488"

# Define the message payload with formatting and bot name
curl -X POST -H "Content-type: application/json" \
     "$webhook_url" \
     -d "{
     \"bot\": {
       \"name\": \"Automation Test Notification\",
       \"image\": \"https://img.freepik.com/premium-vector/hazard-warning-attention-sign-with-exclamation-mark-symbol-white_231786-5218.jpg?w=360\"
     },
     \"text\": \"All test passed on $JOB_BASE_NAME \nCheckout the logs here: $JOB_URL\",
     \"broadcast\": \"true\",
     \"card\": {
       \"title\": \"[SUCESS] TEST PASSED! \",
       \"theme\": \"modern-inline\"
     }  
     }"

# [ERROR] 😱 Test failed:
# [INFO] 🎉 Test passed: