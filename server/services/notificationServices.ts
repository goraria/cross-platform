import crypto from 'crypto';
import nodemailer from 'nodemailer';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

let cachedTransport: nodemailer.Transporter | null = null;

function getTransport() {
  if (cachedTransport) return cachedTransport;
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    console.warn('[MAILER] Missing SMTP_* environment variables. Using console fallback.');
    return null;
  }
  cachedTransport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
  return cachedTransport;
}

export async function sendEmail(opts: SendEmailOptions) {
  const transport = getTransport();
  if (!transport) {
    console.log('[EMAIL:FALLBACK]', opts.to, opts.subject);
    return true;
  }
  const from = process.env.MAIL_FROM || process.env.SMTP_USER!;
  await transport.sendMail({
    from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html
  });
  return true;
}

// Placeholder SMS – integrate Twilio, Vonage, etc.
export async function sendSMS(phone: string, message: string) {
  console.log('[SMS:SEND]', phone, message);
  return true;
}

export function randomNumeric(length: number = 6) {
  let out = '';
  while (out.length < length) {
    out += Math.floor(Math.random() * 10).toString();
  }
  return out.slice(0, length);
}

export function generateVerificationToken(): { token: string; hash: string } {
  const token = crypto.randomBytes(32).toString('hex');
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  return { token, hash };
}

export function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
