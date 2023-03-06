//db import

export function auth(req, res, next) {
  const { nickname, name, email } = req.body;
  res.status(201).json({ Message: `hi ${nickname} sir` });
}
