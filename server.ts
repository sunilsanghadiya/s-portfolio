import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import nodemailer from 'nodemailer';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to 'hotmail', 'outlook', etc., or an SMTP server
    auth: {
      user: process.env['EMAIL_USER'], // Your email from .env
      pass: process.env['EMAIL_PASS']  // Your app password from .env
    }
  });

  // --- Start of Email Sending API Endpoint ---
  // server.post('/api/inquiry', async (req, res) => {
  //   const { name, email, message } = req.body;

  //   // Basic server-side validation
  //   if (!name || !email || !message) {
  //     return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  //   }

  //   // Simple email format validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     return res.status(400).json({ error: 'Please enter a valid email address.' });
  //   }

  //   const mailOptions = {
  //     from: `"${name}" <${email}>`,
  //     to: 'sunilsanghadiya.developer@gmail.com',
  //     subject: `New Inquiry from ${name}`,
  //     html: `
  //     <p><strong>Name:</strong> ${name}</p>
  //     <p><strong>Email:</strong> ${email}</p>
  //     <p><strong>Message:</strong></p>
  //     <p>${message.replace(/\n/g, '<br>')}</p>
  //   `
  //   };

  //   try {
  //     await transporter.sendMail(mailOptions);
  //     console.log(`Inquiry email sent from ${name} (${email})`);
  //     res.status(200).json({ message: 'Your inquiry has been sent successfully!' });
  //   } catch (error) {
  //     console.error('Error sending inquiry email:', error);
  //     res.status(500).json({ error: 'Failed to send your inquiry. Please try again later.' });
  //   }
  // });

  // --- END: Your Email Sending API Endpoint ---

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
