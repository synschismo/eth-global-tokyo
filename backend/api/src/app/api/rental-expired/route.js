export async function GET(request, res) {
    const { body } = request
    return new Response(JSON.stringify({ expired: true }))
  }
  