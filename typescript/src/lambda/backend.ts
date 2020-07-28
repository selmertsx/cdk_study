export async function handler(event: any, context: any, callback: any) {
  console.log(JSON.stringify(context))

  return {
    statusCode: 200,
    headers: {},
    body: "ok"
  };
}
