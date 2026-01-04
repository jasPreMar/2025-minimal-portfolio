# CarMax Sharp Sans Font Files

Place your CarMax Sharp Sans font files (TTF or OTF) in this directory.

The font loader in `layout.tsx` is currently configured to look for:
- `CarMaxSharpSans-Regular.ttf` (weight: 400)
- `CarMaxSharpSans-Bold.ttf` (weight: 700)

If your font files have different names, you'll need to update the `src` paths in `src/app/layout.tsx` to match your actual file names.

**Supported formats:**
- TTF (TrueType Font) - recommended
- OTF (OpenType Font) - also supported

**Note:** You can add additional font weights (e.g., Light, Medium, SemiBold) by adding more entries to the `src` array in the `localFont` configuration in `layout.tsx`.

