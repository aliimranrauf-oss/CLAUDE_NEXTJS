// app/careers/fonts.ts
//
// Arabic-supporting font, loaded only for this page. The global layout.tsx
// (Syne + DM Sans) is untouched — this font is applied conditionally, only
// when dir="rtl" is active, via the `--font-tajawal` CSS variable.

import { Tajawal } from 'next/font/google'

export const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
})
