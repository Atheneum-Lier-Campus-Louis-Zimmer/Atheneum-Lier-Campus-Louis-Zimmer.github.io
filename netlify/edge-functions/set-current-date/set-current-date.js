// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2
export default async (request, context) => {
    // Get your original static HTML
    const response = await context.next();
    const html = await response.text();

    // Generate current date
    const currentDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);

    // Simple string replace to update the first <h1> text
    const updatedHtml = html.replace(
        /<h1>.*?<\/h1>/,
        `<h1>${formattedDate}</h1>`
    );

    return new Response(updatedHtml, {
        headers: { "content-type": "text/html; charset=utf-8" },
    });
};


