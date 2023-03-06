export function auth(req, res, next) {
  res.sendstatus(400);
}

export async function hi(req, res, next) {
  res.json({ message: "WELCOM NOWMEET" });
}
