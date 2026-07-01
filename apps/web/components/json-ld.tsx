type JsonLdValue = Record<string, unknown>

function getJsonLdKey(item: JsonLdValue, index: number): string {
  const type = item['@type']
  if (typeof type === 'string') {
    return `${type}-${index}`
  }
  return `json-ld-${index}`
}

export function JsonLd({ data }: { data: JsonLdValue | JsonLdValue[] }) {
  const items = Array.isArray(data) ? data : [data]

  return (
    <>
      {items.map((item, index) => (
        <script key={getJsonLdKey(item, index)} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </>
  )
}
