"""
Generate Monochrome and Inverted Logo Variants for Yogalife Kolkata
Source: public/kol-logo.png
Outputs:
  - public/kol-logo-mono-black.png       (Tonal monochrome black for light backgrounds)
  - public/kol-logo-invert.png           (Tonal inverted white for dark backgrounds)
  - public/kol-logo-mono-white.png       (Alias for invert)
  - public/kol-logo-solid-black.png      (Pure 1-color flat black silhouette knockout)
  - public/kol-logo-solid-white.png      (Pure 1-color flat white silhouette knockout)
"""

import os
import numpy as np
from PIL import Image

def generate_logos():
    src_path = os.path.join('public', 'kol-logo.png')
    if not os.path.exists(src_path):
        raise FileNotFoundError(f"Source logo not found at {src_path}")

    orig = Image.open(src_path)
    w, h = orig.size
    arr = np.array(orig).astype(float)
    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]
    gray = 0.299 * r + 0.587 * g + 0.114 * b

    # Segment lotus flower & yogi accurately
    lotus_mask = np.zeros((h, w), dtype=bool)
    lotus_mask[129:275, 337:505] = True
    lotus_mask[275:298, 395:445] = True
    is_lotus = lotus_mask & (a > 20) & (r >= g)

    is_yogi = is_lotus & (gray < 105)
    is_petals = is_lotus & (gray >= 105)

    os.makedirs('public', exist_ok=True)
    os.makedirs(os.path.join('public', 'mono'), exist_ok=True)

    # 1. Tonal Monochrome Black (For light backgrounds)
    mono_black = np.zeros((h, w, 4), dtype=np.uint8)
    lotus_silver = 175.0 + (gray - 105.0) * (235.0 - 175.0) / (242.0 - 105.0)
    lotus_silver = np.clip(lotus_silver, 175, 235).astype(np.uint8)

    mono_black[is_petals, 0] = lotus_silver[is_petals]
    mono_black[is_petals, 1] = lotus_silver[is_petals]
    mono_black[is_petals, 2] = lotus_silver[is_petals]
    mono_black[:, :, 3] = a.astype(np.uint8)

    mono_black_img = Image.fromarray(mono_black)
    mono_black_img.save('public/kol-logo-mono-black.png')
    mono_black_img.save('public/mono/kol-logo-mono-black.png')

    # 2. Tonal Monochrome Invert / White (For dark backgrounds)
    mono_white = np.full((h, w, 4), 255, dtype=np.uint8)
    lotus_white_tone = 145.0 + (242.0 - gray) * (195.0 - 145.0) / (242.0 - 105.0)
    lotus_white_tone = np.clip(lotus_white_tone, 145, 195).astype(np.uint8)

    mono_white[is_petals, 0] = lotus_white_tone[is_petals]
    mono_white[is_petals, 1] = lotus_white_tone[is_petals]
    mono_white[is_petals, 2] = lotus_white_tone[is_petals]
    mono_white[:, :, 3] = a.astype(np.uint8)

    mono_white_img = Image.fromarray(mono_white)
    mono_white_img.save('public/kol-logo-invert.png')
    mono_white_img.save('public/kol-logo-mono-white.png')
    mono_white_img.save('public/mono/kol-logo-invert.png')
    mono_white_img.save('public/mono/kol-logo-mono-white.png')

    # 3. Solid Flat 1-Color Black (Knockout)
    solid_black = np.zeros((h, w, 4), dtype=np.uint8)
    solid_alpha = a.copy()
    solid_alpha[is_yogi] = 0
    solid_black[:, :, 3] = solid_alpha.astype(np.uint8)

    solid_black_img = Image.fromarray(solid_black)
    solid_black_img.save('public/kol-logo-solid-black.png')
    solid_black_img.save('public/mono/kol-logo-solid-black.png')

    # 4. Solid Flat 1-Color White (Knockout Invert)
    solid_white = np.full((h, w, 4), 255, dtype=np.uint8)
    solid_white[:, :, 3] = solid_alpha.astype(np.uint8)

    solid_white_img = Image.fromarray(solid_white)
    solid_white_img.save('public/kol-logo-solid-white.png')
    solid_white_img.save('public/mono/kol-logo-solid-white.png')

    print("Successfully generated all monochrome and inverted logos!")

if __name__ == '__main__':
    generate_logos()
