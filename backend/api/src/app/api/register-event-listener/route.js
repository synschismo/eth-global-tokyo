export async function POST(request) {
  const { body } = request
  const { rentId, customerAddress } = body
  
  const result = await fetch('http://localhost:4000/api/register-event-listener', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rentId: rentId, customerAddress: customerAddress }),
  })
  // .then(res => res.json())
  // .catch(error => console.error('Error:', error));
  console.log("rentId")
  console.log(rentId)
  // const result = await fetch('http://localhost:4000/api/register-event-listener?rentId=' + rentId)
  const json = await result.json()
  return new Response(JSON.stringify(json))
}
