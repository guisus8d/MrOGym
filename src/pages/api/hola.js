export async function GET() {
  return new Response(JSON.stringify({ status: 'ok', env: process.env.NODE_ENV }), {
    status: 200
  });
}