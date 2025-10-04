
from vosk import Model, KaldiRecognizer
import wave, json

wf = wave.open("test_indian.wav", "rb")
model = Model(r"C:\Users\keyar\Downloads\vosk-model-small-en-us-0.15")
rec = KaldiRecognizer(model, wf.getframerate())

while True:
    data = wf.readframes(4000)
    if not data:
        break
    if rec.AcceptWaveform(data):
        print(json.loads(rec.Result())["text"])

print(json.loads(rec.FinalResult())["text"])