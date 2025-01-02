const express = require('express');
const bodyParser = require('body-parser');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

const app = express();
const client = new textToSpeech.TextToSpeechClient({
    keyFilename: 'path-to-your-json-file.json',
});

app.use(bodyParser.json());

app.post('/synthesize', async (req, res) => {
    const text = req.body.text;
    const request = {
        input: { text },
        voice: { languageCode: 'en-US', name: 'en-US-Wavenet-D' },
        audioConfig: { audioEncoding: 'MP3' },
    };
    const [response] = await client.synthesizeSpeech(request);
    res.set('Content-Type', 'audio/mpeg');
    res.send(response.audioContent);
});

app.listen(3000, () => console.log('Server started on port 3000'));