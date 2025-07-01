const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://term-ez.com",
  "https://www.term-ez.com",
  "https://onetop.la",
  "https://www.onetop.la",
];

export const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy does not allow access from this origin"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
