export default {
    headers: [
        {
            source: "/(.*)",
            headers: [
                {
                    key: "Content-Security-Policy",
                    value:
                        "default-src * 'self' blob: data: ws: wss: http: https:; connect-src * 'self' http://localhost:3000 http://127.0.0.1:*;",
                },
            ],
        },
    ],
};
