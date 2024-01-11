import json

from flask import Flask, render_template, request, jsonify
from twilio.rest import Client

app = Flask(__name__)

account_sid = "AC94ed63a1bed66b169b4d09fc612476e2"
auth_token = "c23f5a7913e1e692a704f8bbba0af450"
twilio_phone_number = "+12548750345"

client = Client(account_sid, auth_token)

def send_sms(to, body):
    message = client.messages.create(
        body=body,
        messaging_service_sid='MG3518ea495db8ab5f0580585dda8092a6', 
        to=to
    )
    return message.sid

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/subscribe', methods=['POST'])
def subscribe():
    try:
        phone_number =  "+16132613595"
        
        confirmation_message = "You have successfully subscribed to weather notifications!"
        send_sms(phone_number, confirmation_message)

        return jsonify({"status": "success", "message": "Subscription successful!"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
    #