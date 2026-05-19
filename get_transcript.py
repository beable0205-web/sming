import json
from youtube_transcript_api import YouTubeTranscriptApi

try:
    transcript = YouTubeTranscriptApi.get_transcript('0huA3Fx7NVc', languages=['ko', 'en'])
    text = " ".join([entry['text'] for entry in transcript])
    with open('transcript.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Transcript saved successfully.")
except Exception as e:
    print(f"Error: {e}")
