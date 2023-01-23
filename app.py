import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)
openai.api_key = "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"

def format_response(response):
    soup = BeautifulSoup(response, "html.parser")
    response = soup.prettify()
    # Aplicar outras regras de formatação aqui
    return response

@app.route('/answer', methods=['POST'])
def answer():
    question = request.json["question"]
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=(f"{question}\n"),
        max_tokens=1024,
        temperature=0.1,

        stop=["python","javascript","html","css"]
    )
    # Formatar resposta antes de retornar
    response = format_response(response["choices"][0]["text"])
    return response

if __name__ == "__main__":
    app.run(host='10.0.1.100', port=5500)