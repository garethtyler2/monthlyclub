// Reusable email styling for Monthly Club emails
export const emailStyles = {
  // Base container styles
  container: `
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
    color: #ffffff;
    line-height: 1.6;
  `,
  
  // Email content wrapper
  content: `
    background: rgba(15, 23, 42, 0.95);
    border-radius: 12px;
    margin: 20px;
    overflow: hidden;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
  `,
  
  // Header styles
  header: `
    padding: 32px 24px 24px 24px;
    text-align: center;
    border-bottom: 1px solid rgba(71, 85, 105, 0.3);
  `,
  
  // Main content area
  main: `
    padding: 32px 24px;
  `,
  
  // Footer styles
  footer: `
    background: rgba(15, 23, 42, 0.8);
    padding: 32px 24px;
    text-align: center;
    border-top: 1px solid rgba(71, 85, 105, 0.3);
  `,
  
  // Typography
  h1: `
    font-size: 32px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 16px 0;
    line-height: 1.2;
  `,
  
  h2: `
    font-size: 24px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 16px 0;
    line-height: 1.3;
  `,
  
  h3: `
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 16px 0;
    line-height: 1.3;
  `,
  
  p: `
    margin: 0 0 16px 0;
    color: #e2e8f0;
    font-size: 16px;
    line-height: 1.6;
  `,
  
  // Links
  link: `
    color: #22d3ee;
    text-decoration: none;
  `,
  
  // Buttons
  button: `
    display: inline-block;
    padding: 14px 28px;
    background: linear-gradient(135deg, #3b82f6 0%, #14b8a6 100%);
    color: #ffffff !important;
    text-decoration: none !important;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  `,
  
  buttonSecondary: `
    display: inline-block;
    padding: 14px 28px;
    background: rgba(71, 85, 105, 0.8);
    color: #ffffff !important;
    text-decoration: none !important;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    border: 1px solid #475569;
    cursor: pointer;
    transition: all 0.3s ease;
  `,
  
  // Cards
  card: `
    background: rgba(30, 41, 59, 0.6);
    border: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 12px;
    padding: 24px;
    margin: 16px 0;
  `,
  
  // Badge
  badge: `
    display: inline-block;
    padding: 8px 16px;
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 20px;
    font-size: 12px;
    color: #ffffff;
    font-weight: 600;
    margin-bottom: 16px;
  `,
  
  // Mobile responsive
  mobileStyles: `
    @media only screen and (max-width: 600px) {
      .email-content { margin: 10px !important; }
      .email-main { padding: 20px !important; }
      .email-header { padding: 20px !important; }
      .email-footer { padding: 20px !important; }
      h1 { font-size: 28px !important; }
      h2 { font-size: 20px !important; }
      h3 { font-size: 18px !important; }
      .email-button { width: 100% !important; display: block !important; box-sizing: border-box !important; }
    }
  `
};

// Helper function to create a styled email template
export function createStyledEmail(content: string, title?: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title || 'Monthly Club'}</title>
        <style>
          body { ${emailStyles.container} }
          .email-content { ${emailStyles.content} }
          .email-header { ${emailStyles.header} }
          .email-main { ${emailStyles.main} }
          .email-footer { ${emailStyles.footer} }
          h1 { ${emailStyles.h1} }
          h2 { ${emailStyles.h2} }
          h3 { ${emailStyles.h3} }
          p { ${emailStyles.p} }
          a { ${emailStyles.link} }
          .email-button { ${emailStyles.button} }
          .email-button-secondary { ${emailStyles.buttonSecondary} }
          .email-card { ${emailStyles.card} }
          .email-badge { ${emailStyles.badge} }
          ${emailStyles.mobileStyles}
        </style>
      </head>
      <body>
        <div class="email-content">
          ${content}
        </div>
      </body>
    </html>
  `;
}
