import re
import os
import urllib.request
import urllib.error

html_path = r'c:\Users\DucNguyen\OneDrive\Desktop\Coding\eprofile\index.html'
assets_dir = r'c:\Users\DucNguyen\OneDrive\Desktop\Coding\eprofile\assets\images'
os.makedirs(assets_dir, exist_ok=True)

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

urls = re.findall(r'src="(http[^"]+)"', html)
urls = list(set(urls)) 

print(urls)

for url in urls:
    filename = url.split('/')[-1].split('?')[0][-30:]
    filename = re.sub(r'[^a-zA-Z0-9_\-\.]', '_', filename)
    if not filename.endswith(('.png', '.jpg', '.jpeg', '.svg', '.webp')):
        filename += '.png'
    
    local_path = os.path.join(assets_dir, filename)
    
    if not os.path.exists(local_path):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(local_path, 'wb') as out_file:
                out_file.write(response.read())
        except Exception as e:
            print(f'Failed to download {url}: {e}')
    
    relative_path = './assets/images/' + filename
    html = html.replace(url, relative_path)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print('Success: downloaded images and updated HTML.')
