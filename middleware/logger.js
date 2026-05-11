const logger = (req, res, next) => {
  const method = req.method;
  const protocol = req.protocol;
  const host = req.get("host");
  const path = req.originalUrl;
  const date = new Date().toISOString();

  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${date}] ${method} ${protocol}://${host}${path} ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};

export default logger;