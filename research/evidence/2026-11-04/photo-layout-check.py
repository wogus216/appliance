from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import hashlib, json, xml.etree.ElementTree as ET

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.main = False
        self.words, self.links, self.images = [], [], []
        self.ids, self.noindex = set(), False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'main': self.main = True
        if a.get('id'): self.ids.add(a['id'])
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if tag == 'img' and self.main: self.images.append(a)
        if tag == 'meta' and a.get('name') == 'robots': self.noindex = 'noindex' in a.get('content', '')
    def handle_endtag(self, tag):
        if tag == 'main': self.main = False
    def handle_data(self, data):
        if self.main and data.strip(): self.words.append(data.strip())

def page_key(path):
    return unquote(path.lstrip('/').rstrip('/')) + '.html' if path not in ['', '/'] else 'index.html'

baseline = json.loads(Path('/tmp/salimlab-final-guides-before.json').read_text())
audit = json.loads(Path('/tmp/salimlab-photo-audit.json').read_text())
pages, changed, errors = {}, [], []
for f in Path('out').rglob('*.html'):
    if '_next' in f.parts or '__preview' in f.parts: continue
    key = str(f.relative_to('out'))
    p = Page(); p.feed(f.read_text()); pages[key] = p
    if baseline.get(key) != hashlib.sha256(' '.join(p.words).encode()).hexdigest(): changed.append(key)
links = image_count = 0
for key, p in pages.items():
    for img in p.images:
        src = img.get('src', '')
        if src.startswith('/') and not (Path('out') / urlsplit(src).path.lstrip('/')).exists(): errors.append([key, 'image', src])
        if 'object-cover' in img.get('class', ''): errors.append([key, 'cover', src])
        if '/appliances/' in src:
            image_count += 1
            if 'object-contain' not in img.get('class', ''): errors.append([key, 'fit', src])
    for href in p.links:
        u = urlsplit(href)
        if u.scheme or u.netloc or (u.path and not u.path.startswith('/')): continue
        target = page_key(u.path) if u.path else key
        if target not in pages:
            if not (Path('out') / u.path.lstrip('/')).exists(): errors.append([key, 'link', href])
            continue
        if u.fragment and unquote(u.fragment) not in pages[target].ids: errors.append([key, 'anchor', href])
        links += 1
for slug in ['air-purifier', 'fan', 'tv', 'wireless-earbuds']:
    assert {'visual-summary-heading', 'decision-flow-heading', 'buying-guide'} <= pages[f'category/{slug}.html'].ids
urls = [e.text for e in ET.fromstring(Path('out/sitemap.xml').read_text()).iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
for url in urls:
    key = page_key(urlsplit(url).path)
    if key not in pages or pages[key].noindex: errors.append(['sitemap', url])
allowed = set(audit['affectedImageRoutes'])
assert all('/' + ('' if key == 'index.html' else key.removesuffix('.html')) in allowed for key in changed), changed
assert not errors, errors
report = {'pages': len(pages), 'sitemap': len(urls), 'internalLinksChecked': links, 'productImageOccurrences': image_count, 'changedMainText': sorted(changed), 'imageStyleRoutes': len(allowed), 'catalogOriginalsVisuallyInspected': len(audit['catalog']), 'errors': errors}
Path('/tmp/salimlab-photo-final-static.json').write_text(json.dumps(report, ensure_ascii=False, indent=2))
print({k: v for k, v in report.items() if k != 'changedMainText'})
print('Changed text pages:', len(changed))
