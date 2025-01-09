import { delay, http, HttpResponse } from "msw";

const getRates = () => {
  const rate1 = Math.random() * 2;
  const rate2 = Math.random() * 2;
  const rate3 = Math.random() * 2;
  const rates = [
    { from: "USD", to: "USD", rate: 1 },
    { from: "EUR", to: "EUR", rate: 1 },
    { from: "GBP", to: "GBP", rate: 1 },
    { from: "EUR", to: "USD", rate: rate1 },
    { from: "USD", to: "EUR", rate: 1 / rate1 },
    { from: "GBP", to: "USD", rate: rate2 },
    { from: "USD", to: "GBP", rate: 1 / rate2 },
    { from: "GBP", to: "EUR", rate: rate3 },
    { from: "EUR", to: "GBP", rate: 1 / rate3 },
  ];
  return rates;
};

export const handlers = [
  http.get("/rates", async () => {
    await delay();

    return HttpResponse.json(getRates());
  }),
  http.get("/rate", async ({ request }) => {
    // Construct a URL instance out of the intercepted request.
    const url = new URL(request.url);

    // Extract the "to" and "from" query parameters from the URL.
    const to = url.searchParams.get("to");
    const from = url.searchParams.get("from");

    const rates = getRates();
    let response = {};

    rates.forEach(function (el) {
      if (el.from === from && el.to === to) {
        response = el;
      }
    });

    if (Object.keys(response).length === 0) {
      return new HttpResponse(null, { status: 404 });
    }

    await delay();
    return HttpResponse.json(response);
  }),
];
