// Initialize MSW for development
export async function initMocks() {
  if (typeof window === "undefined") {
    // Server-side (Node.js)
    const { server } = await import("./node");
    console.log("server side");
    server.listen();
    server.events.on("request:start", ({ request }) => {
      console.log("Outgoing:", request.method, request.url);
    });
  } else {
    // Client-side (Browser)
    const { worker } = await import("./browser");

    await worker.start({
      onUnhandledRequest: "warn",
      quiet: true,
      serviceWorker: {
        options: {
          scope: "/",
        },
      },
    });
    worker.events.on("request:start", ({ request }) => {
      console.log("Outgoing:", request.method, request.url);
    });
    console.log("client side");
  }
}
