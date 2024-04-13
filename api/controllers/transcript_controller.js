const fs = require('fs');
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const transcriptionController = {
    transcript: async(req, res) => {
        try {
            if (!req.files || !req.files.audio) {
                return res.status(400).json({ error: 'No audio file provided' });
            }    
    
            const audioFile = req.files.audio;
    
            const transcription = await openai.audio.transcriptions.create({
                file: fs.createReadStream(audioFile.tempFilePath),
                model: 'whisper-1',
            });    
    
            return res.json({ transcription: transcription.text });
        } catch (error) {
            console.error('Error transcribing audio:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }    
    }    
};    


module.exports = transcriptionController;
