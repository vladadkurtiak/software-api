export const renderHTML = (code: string) => {
  return `<html>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #007bff; font-size: 24px; margin-bottom: 20px;">Your Verification Code</h1>
        <p style="font-size: 16px; color: #333;">Thank you for registering with us. Your verification code is:</p>
        <div style="font-size: 32px; font-weight: bold; color: #007bff; margin: 20px 0;">${code}</div>
        <p style="font-size: 14px; color: #666;">If you did not request this code, please ignore this email.</p>
        <footer style="font-size: 12px; color: #999; margin-top: 20px;">
          &copy; ${new Date().getFullYear()} software.com. All rights reserved.
        </footer>
      </div>
    </body>
    </html>`;
};
