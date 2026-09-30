import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

export type PhotoFrameVariant = 'polaroid' | 'corners' | 'pocket'
export type PhotoFramePart = 'root' | 'media' | 'image' | 'caption'
export type FilmStripPart = 'root' | 'track' | 'frame' | 'media' | 'image' | 'caption' | 'itemCaption'
export type PhotoFrameStyle = CSSProperties & { [key: `--dp-${string}`]: string | number | undefined }
export type PhotoFrameProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  variant?: PhotoFrameVariant
  caption?: ReactNode
  /** Width divided by height of the image area. Defaults to 3 / 2. */
  aspectRatio?: number
  classNames?: Partial<Record<PhotoFramePart, string>>
  style?: PhotoFrameStyle
} & ({ src: string; alt: string; children?: never } | { src?: never; alt?: never; children?: ReactNode })

export type FilmStripItem = {
  id: string
  caption?: ReactNode
} & ({ src: string; alt: string; children?: never } | { src?: never; alt?: never; children: ReactNode })

export interface FilmStripProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  items: readonly FilmStripItem[]
  caption?: ReactNode
  aspectRatio?: number
  classNames?: Partial<Record<FilmStripPart, string>>
  style?: PhotoFrameStyle
}
