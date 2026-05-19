import textwrap
with open('yt_sub_clean.txt', 'r', encoding='utf-8') as f:
    text = f.read()

wrapped_text = textwrap.fill(text, width=100)
with open('yt_sub_wrapped.txt', 'w', encoding='utf-8') as f:
    f.write(wrapped_text)
