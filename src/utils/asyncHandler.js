const asyncHandler = (reqestHendeler) => {
  return (req, res, next) => {
    Promise.resolve(reqestHendeler(req, res, next)).catch((err) => next(err));
  };
};

export default asyncHandler;