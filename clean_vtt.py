import re

def clean_vtt(file_path, output_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    clean_lines = []
    last_line = ""
    for line in lines:
        line = line.strip()
        # Skip empty lines, WEBVTT header, timestamps, and position info
        if not line or line == "WEBVTT" or line.startswith("Kind:") or line.startswith("Language:") or "-->" in line:
            continue
        
        # Remove any remaining tags like <c> or </c>
        line = re.sub(r'<[^>]+>', '', line)
        
        if line and line != last_line:
            clean_lines.append(line)
            last_line = line
            
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(" ".join(clean_lines))

clean_vtt('yt_sub.ko.vtt', 'yt_sub_clean.txt')
