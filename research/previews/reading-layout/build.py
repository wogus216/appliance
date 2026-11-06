"""Build a local-only comparison from the existing static export; no app changes."""
from pathlib import Path
import re
import shutil

ROOT = Path(__file__).resolve().parents[3]
SOURCE = Path(__file__).resolve().parent
DEST = ROOT / 'out' / '__preview' / 'reading-layout'
original = (ROOT / 'out/category/dishwasher.html').read_text()
# Keep the actual exported page styling/content; omit hydration, ads and metadata
# that could describe the draft as the public article.
original = re.sub(r'<script\b[^>]*>.*?</script>', '', original, flags=re.S)
original = re.sub(r'<link\b[^>]*rel="(?:preload|modulepreload|canonical)"[^>]*>', '', original)
original = re.sub(r'<meta\b[^>]*name="robots"[^>]*>', '', original)
original = original.replace('<head>', '<head><meta name="robots" content="noindex,nofollow"/>', 1)
marker = '<section aria-labelledby="product-list">'
assert original.count(marker) == 1
overview = (SOURCE / 'overview.html').read_text()
styles = (SOURCE / 'preview.css').read_text()
proposed = original.replace('</head>', '<style>' + styles + '</style></head>', 1)
proposed = proposed.replace(marker, overview + marker, 1)
assert proposed.index('id="proposal-heading"') < proposed.index(marker)
assert 'adsbygoogle.js' not in proposed
DEST.mkdir(parents=True, exist_ok=True)
(DEST / 'dishwasher-current.html').write_text(original)
(DEST / 'dishwasher-proposed.html').write_text(proposed)
shutil.copyfile(SOURCE / 'index.html', DEST / 'index.html')
print('http://127.0.0.1:3012/__preview/reading-layout/index.html')
