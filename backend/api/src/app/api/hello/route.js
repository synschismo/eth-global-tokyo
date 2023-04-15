export async function GET(request) {
  const result = await fetch('http://localhost:4000/api/hello', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'Next.js' }),
  })
  const json = await result.json()
  return new Response(JSON.stringify(json))
}
