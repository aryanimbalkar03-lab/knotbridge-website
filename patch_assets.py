import os

d = 'C:/Users/ARYAN NIMBALKAR/.gemini/antigravity/scratch/techbridge/portfolio/rga-motion'

for root, _, files in os.walk(d):
    for f in files:
        if f.endswith(('.html', '.js')):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            new_content = content.replace('"/images/', '"/portfolio/rga-motion/images/')
            new_content = new_content.replace('"/videos/', '"/portfolio/rga-motion/videos/')
            new_content = new_content.replace('"/icon.svg', '"/portfolio/rga-motion/icon.svg')
            new_content = new_content.replace('"/icon-dark', '"/portfolio/rga-motion/icon-dark')
            new_content = new_content.replace('"/placeholder', '"/portfolio/rga-motion/placeholder')
            
            if content != new_content:
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                print(f"Patched {f}")
