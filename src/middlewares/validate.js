const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }

  // Aca sobrescribimos req.validated con los datos parseados
  req.validated = result.data;
  next();
};

export default validate;
