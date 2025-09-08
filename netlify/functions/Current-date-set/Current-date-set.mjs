// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2
export default async (request, context) => {
    const response = await context.next();
    let html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Generate current date string
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const formattedDate = currentDate.toLocaleDateString("nl-BE", options);

    // Replace the <h1> text content
    const h1 = doc.querySelector("h1");
    if (h1) {
        h1.textContent = formattedDate;
    }

    // Return modified HTML
    return new Response("<!DOCTYPE html>\n" + doc.documentElement.outerHTML, {
        headers: { "content-type": "text/html; charset=utf-8" },
    });
};
