// this logger is an http handler unto itself, however it will not be used on a specific route, but will get activated before all routes
export const logger = (req, res, next) => {
  console.log(`received request [${req.url}], [${req.method}]`);
  // by calling next(), we are passing the request through this middleware to the subsequent handlers, where their routed logic will be performed.
  next();
};
