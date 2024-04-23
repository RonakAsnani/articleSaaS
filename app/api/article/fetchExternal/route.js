export const GET = async (req, res) => {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const response = await fetch(searchParams.get("url"));

    const html = await response.text();
    return new Response(JSON.stringify({ html_content: html }), {
      status: 201,
    });
  } catch (error) {
    // console.log(error);
    return new Response("Failed to fetch content", { status: 500 });
  }
};
