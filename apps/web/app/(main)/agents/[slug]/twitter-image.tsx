import OpenGraphImage from './opengraph-image'

export const alt = 'Agent on evex'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

type OpenGraphImageProps = Parameters<typeof OpenGraphImage>[0]

export default async function TwitterImage(props: OpenGraphImageProps) {
  return await OpenGraphImage(props)
}
