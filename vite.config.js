import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function contactApiPlugin() {
  return {
    name: 'contact-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              const messageRecord = {
                id: Date.now().toString(),
                name: data.name || 'Anonymous',
                email: data.email || 'No email',
                subject: data.subject || 'Portfolio Inquiry',
                message: data.message || '',
                receivedAt: new Date().toLocaleString(),
                status: 'received',
              };

              const messagesFile = path.resolve(__dirname, 'messages.json');
              let existing = [];
              if (fs.existsSync(messagesFile)) {
                try {
                  existing = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
                } catch {
                  existing = [];
                }
              }
              existing.unshift(messageRecord);
              fs.writeFileSync(messagesFile, JSON.stringify(existing, null, 2), 'utf8');

              console.log('\n=============================================');
              console.log('📬 NEW MESSAGE RECEIVED DIRECTLY FOR ADIS KIDAN');
              console.log(`From:    ${messageRecord.name} <${messageRecord.email}>`);
              console.log(`Subject: ${messageRecord.subject}`);
              console.log(`Time:    ${messageRecord.receivedAt}`);
              console.log(`Message: ${messageRecord.message}`);
              console.log('=============================================\n');

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                message: 'Message sent directly and received by Adis Kidan!',
                record: messageRecord
              }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else if (req.method === 'GET') {
          const messagesFile = path.resolve(__dirname, 'messages.json');
          let existing = [];
          if (fs.existsSync(messagesFile)) {
            try {
              existing = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
            } catch {
              existing = [];
            }
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, count: existing.length, messages: existing }));
        } else {
          next();
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    contactApiPlugin(),
  ],
})
