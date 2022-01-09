export const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.orginalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statuscode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statuscode).json({
    message: err.message,
  });
};
