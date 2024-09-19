#!/bin/bash

# Define the webhook URL
webhook_url=$WEBHOOK_URL_FULL

# Define the message payload with formatting and bot name
curl -X POST -H "Content-type: application/json" \
     "$webhook_url" \
     -d "{
     \"bot\": {
       \"name\": \"Automation Test Notification\",
       \"image\": \"https://img.freepik.com/premium-vector/hazard-warning-attention-sign-with-exclamation-mark-symbol-white_231786-5218.jpg?w=360\"
     },
     \"text\": \"Running $JOB_BASE_NAME \nCheckout the logs here: $JOB_URL\",
     \"broadcast\": \"true\",
     \"card\": {
       \"title\": \"[INFO] Starting automation test: \",
       \"theme\": \"modern-inline\"
     }  
     }"

# [ERROR] 😱 Test failed:
# [INFO] 🎉 Test passed: