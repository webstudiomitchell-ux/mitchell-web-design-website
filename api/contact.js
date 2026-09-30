// Sends contact form messages to Faith's inbox through Google Workspace (Gmail SMTP).
// Needs two Vercel environment variables: GMAIL_USER and GMAIL_APP_PASSWORD.
const nodemailer = require("nodemailer");

const clean = (v, max) => String(v || "").trim().slice(0, max);

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  const body = req.body || {};
  if (body.company) return res.status(200).json({ ok: true }); // hidden spam trap was filled in

  const name = clean(body.name, 200);
  const reach = clean(body.reach, 200);
  const kind = clean(body.kind, 200);
  const notes = clean(body.notes, 5000);
  if (!reach) return res.status(400).json({ ok: false, error: "A way to reach you is required." });

  const user = process.env.GMAIL_USER;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass: process.env.GMAIL_APP_PASSWORD },
  });

  const text = [
    "New message from mitchellwebdesign.ca",
    "",
    "Name: " + (name || "(not given)"),
    "Phone or email: " + reach,
    "Looking for: " + (kind || "(not given)"),
    "",
    notes || "(no message)",
  ].join("\n");

  try {
    await transporter.sendMail({
      from: { name: "Mitchell Web Design website", address: user },
      to: user,
      replyTo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reach) ? reach : undefined,
      subject: "Website message" + (name ? " from " + name : ""),
      text,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact form send failed", err);
    return res.status(500).json({ ok: false });
  }
};
