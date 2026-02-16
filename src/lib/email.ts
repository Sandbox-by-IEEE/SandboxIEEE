/**
 * ============================================================================
 * EMAIL SERVICE - COMPETITION REGISTRATION
 * ============================================================================
 * 
 * Purpose: Send emails for registration flow
 * - Account activation
 * - Password reset
 * - Registration confirmation
 * - Status updates
 * ============================================================================
 */

import { transporter } from './mailTransporter';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const FROM_EMAIL = process.env.SMTP_USER || 'sandbox@ieee-itb.org';
const FROM_NAME = 'The Sandbox 3.0 - IEEE ITB';

/**
 * Send account activation email
 */
export async function sendActivationEmail(
  to: string,
  name: string,
  token: string
) {
  const activationUrl = `${BASE_URL}/activate?token=${token}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Activate Your Account</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(180deg, #0B0102 0%, #190204 50%, #0B0102 100%);
      min-height: 100vh;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #1a0405;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      border: 2px solid rgba(255, 205, 141, 0.2);
    }
    .header {
      background: linear-gradient(135deg, #190204 0%, #2d0609 100%);
      padding: 40px 30px;
      text-align: center;
    }
.site-title {
      margin: 0;
      background: linear-gradient(90deg, #FFCD8D 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .subtitle {
      margin: 8px 0 0 0;
      color: #E8B4A8;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    .content {
      padding: 40px 30px;
      background-color: #1a0405;
    }
    .title {
      margin: 0 0 20px 0;
      background: linear-gradient(90deg, #FFCD8D 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 28px;
      font-weight: bold;
    }
    .text {
      margin: 0 0 16px 0;
      color: #E8B4A8;
      font-size: 16px;
      line-height: 1.7;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #8B3A3A 0%, #5A2424 100%);
      color: #FFFFFF;
      text-decoration: none;
      padding: 18px 45px;
      border-radius: 12px;
      font-weight: bold;
      font-size: 16px;
      box-shadow: 0 8px 25px rgba(139, 58, 58, 0.4);
      border: 1px solid rgba(255, 205, 141, 0.3);
      letter-spacing: 0.5px;
    }
    .button-container {
      text-align: center;
      margin: 35px 0;
    }
    .info-box {
      background: linear-gradient(135deg, rgba(139, 58, 58, 0.2) 0%, rgba(90, 36, 36, 0.2) 100%);
      border-left: 4px solid #8B3A3A;
      padding: 18px;
      margin: 30px 0;
      border-radius: 8px;
      border: 1px solid rgba(139, 58, 58, 0.3);
    }
    .info-text {
      margin: 0;
      color: #FFCD8D;
      font-size: 14px;
      line-height: 1.6;
    }
    .link {
      color: #FFCD8D;
      text-decoration: none;
      word-break: break-all;
      font-size: 13px;
    }
    .link-box {
      margin: 8px 0 0 0;
      padding: 12px;
      background: rgba(255, 205, 141, 0.05);
      border-radius: 6px;
      border: 1px solid rgba(255, 205, 141, 0.1);
    }
    .footer {
      background: linear-gradient(135deg, #0B0102 0%, #190204 100%);
      padding: 30px;
      text-align: center;
      border-top: 1px solid rgba(255, 205, 141, 0.1);
    }
    .footer-text {
      margin: 0 0 8px 0;
      color: #9b7a6f;
      font-size: 13px;
    }
    .footer-copyright {
      margin: 8px 0 0 0;
      color: #6b5651;
      font-size: 12px;
    }
    .steps {
      margin-top: 30px;
      padding-left: 20px;
      color: #E8B4A8;
    }
    .steps li {
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
<h1 class="site-title">The Sandbox 3.0</h1>
      <p class="subtitle">IEEE ITB Student Branch</p>
    </div>

    <div class="content">
      <h2 class="title">Welcome, ${name}!</h2>
      
      <p class="text">Thank you for registering for <strong style="color: #FFCD8D;">The Sandbox 3.0</strong>! We're excited to have you join our competition.</p>
      
      <p class="text">To complete your registration and activate your account, please verify your email address by clicking the button below:</p>

      <div class="button-container">
        <a href="${activationUrl}" class="button">
          Activate My Account
        </a>
      </div>

      <div class="info-box">
        <p class="info-text">
          <strong>Important:</strong> This activation link will expire in <strong>24 hours</strong>.
        </p>
      </div>

      <p class="text" style="margin-top: 20px; color: #9b7a6f; font-size: 14px;">
        If the button doesn't work, copy and paste this link into your browser:
      </p>
      <div class="link-box">
        <a href="${activationUrl}" class="link">${activationUrl}</a>
      </div>

      <div style="margin-top: 30px;">
        <p class="text"><strong style="color: #FFCD8D;">What's next?</strong></p>
        <ol class="steps">
          <li>Activate your account using the link above</li>
          <li>Wait for admin to verify your team registration</li>
          <li>Submit your abstract/proposal when approved</li>
          <li>Upload payment proof after preliminary qualification</li>
          <li>Get ready for the competition! </li>
        </ol>
      </div>

    <div class="footer">
      <p class="footer-text">
        Need help? Contact us at 
        <a href="mailto:sandbox@ieee-itb.org" style="color: #FFCD8D; text-decoration: none;">
          sandbox@ieee-itb.org
        </a>
      </p>
      <p class="footer-copyright">
        © 2026 The Sandbox - IEEE ITB Student Branch. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to,
      subject: '✅ Activate Your Sandbox Account - Action Required',
      html,
    });

    console.log(`✅ Activation email sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send activation email:', error);
    throw error;
  }
}

/**
 * Send registration confirmation email (after admin approval)
 */
export async function sendRegistrationApprovedEmail(
  to: string,
  name: string,
  teamName: string,
  competitionName: string
) {
  const dashboardUrl = `${BASE_URL}/dashboard`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Approved</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(180deg, #0B0102 0%, #190204 50%, #0B0102 100%);
      min-height: 100vh;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #1a0405;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      border: 2px solid rgba(255, 205, 141, 0.2);
    }
    .header {
      background: linear-gradient(135deg, #190204 0%, #2d0609 100%);
      padding: 40px 30px;
      text-align: center;
    }
.site-title {
      margin: 0;
      background: linear-gradient(90deg, #FFCD8D 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .subtitle {
      margin: 8px 0 0 0;
      color: #E8B4A8;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    .content {
      padding: 40px 30px;
      background-color: #1a0405;
    }
    .success-badge {
      background: linear-gradient(135deg, #8B5A3A 0%, #5A3824 100%);
      color: #FFFFFF;
      padding: 12px 24px;
      border-radius: 25px;
      display: inline-block;
      font-weight: bold;
      margin-bottom: 20px;
      border: 1px solid rgba(255, 205, 141, 0.3);
      font-size: 14px;
      letter-spacing: 0.5px;
    }
    .title {
      margin: 0 0 20px 0;
      background: linear-gradient(90deg, #FFCD8D 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 28px;
      font-weight: bold;
    }
    .text {
      margin: 0 0 16px 0;
      color: #E8B4A8;
      font-size: 16px;
      line-height: 1.7;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #8B3A3A 0%, #5A2424 100%);
      color: #FFFFFF;
      text-decoration: none;
      padding: 18px 45px;
      border-radius: 12px;
      font-weight: bold;
      font-size: 16px;
      box-shadow: 0 8px 25px rgba(139, 58, 58, 0.4);
      border: 1px solid rgba(255, 205, 141, 0.3);
      letter-spacing: 0.5px;
    }
    .button-container {
      text-align: center;
      margin: 35px 0;
    }
    .info-box {
      background: linear-gradient(135deg, rgba(139, 90, 58, 0.2) 0%, rgba(90, 56, 36, 0.2) 100%);
      border-left: 4px solid #8B5A3A;
      padding: 18px;
      margin: 30px 0;
      border-radius: 8px;
      border: 1px solid rgba(255, 205, 141, 0.2);
    }
    .info-text {
      margin: 0;
      color: #E8B4A8;
      font-size: 15px;
      line-height: 1.6;
    }
    .footer {
      background: linear-gradient(135deg, #0B0102 0%, #190204 100%);
      padding: 30px;
      text-align: center;
      border-top: 1px solid rgba(255, 205, 141, 0.1);
    }
    .footer-text {
      margin: 0 0 8px 0;
      color: #9b7a6f;
      font-size: 13px;
    }
    .footer-copyright {
      margin: 8px 0 0 0;
      color: #6b5651;
      font-size: 12px;
    }
    .steps {
      margin-top: 20px;
      padding-left: 20px;
      color: #E8B4A8;
    }
    .steps li {
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
<h1 class="site-title">The Sandbox 3.0</h1>
      <p class="subtitle">IEEE ITB Student Branch</p>
    </div>

    <div class="content">
      <div style="text-align: center;">
        <div class="success-badge">REGISTRATION APPROVED</div>
      </div>

      <h2 class="title">Congratulations, ${name}!</h2>
      
      <p class="text">Great news! Your team registration has been <strong style="color: #FFCD8D;">approved</strong> by our admin team.</p>
      
      <div class="info-box">
        <p class="info-text" style="margin: 0;"><strong style="color: #FFCD8D;">Team:</strong> ${teamName}</p>
        <p class="info-text" style="margin: 8px 0 0 0;"><strong style="color: #FFCD8D;">Competition:</strong> ${competitionName}</p>
      </div>

      <p class="text"><strong style="color: #FFCD8D;">Next Steps:</strong></p>
      <ol class="steps">
        <li>Login to your dashboard</li>
        <li>Submit your preliminary work (abstract/proposal)</li>
        <li>Wait for preliminary evaluation</li>
        <li>If qualified, proceed to payment</li>
      </ol>

      <div class="button-container">
        <a href="${dashboardUrl}" class="button">
          Go to Dashboard
        </a>
      </div>
    </div>

    <div class="footer">
      <p class="footer-text">
        Need help? Contact us at 
        <a href="mailto:sandbox@ieee-itb.org" style="color: #FFCD8D; text-decoration: none;">
          sandbox@ieee-itb.org
        </a>
      </p>
      <p class="footer-copyright">
        © 2026 The Sandbox - IEEE ITB Student Branch. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to,
      subject: '🎉 Your Registration Has Been Approved!',
      html,
    });

    console.log(`✅ Approval email sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send approval email:', error);
    throw error;
  }
}

/**
 * Send registration rejection email
 */
export async function sendRegistrationRejectedEmail(
  to: string,
  name: string,
  teamName: string,
  reason?: string
) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Update</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(180deg, #0B0102 0%, #190204 50%, #0B0102 100%);
      min-height: 100vh;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #1a0405;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      border: 2px solid rgba(255, 205, 141, 0.2);
    }
    .header {
      background: linear-gradient(135deg, #190204 0%, #2d0609 100%);
      padding: 40px 30px;
      text-align: center;
    }
.site-title {
      margin: 0;
      background: linear-gradient(90deg, #FFCD8D 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .subtitle {
      margin: 8px 0 0 0;
      color: #E8B4A8;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    .content {
      padding: 40px 30px;
      background-color: #1a0405;
    }
    .title {
      margin: 0 0 20px 0;
      background: linear-gradient(90deg, #FFCD8D 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 24px;
      font-weight: bold;
    }
    .text {
      margin: 0 0 16px 0;
      color: #E8B4A8;
      font-size: 16px;
      line-height: 1.7;
    }
    .reason-box {
      background: linear-gradient(135deg, rgba(139, 58, 58, 0.3) 0%, rgba(90, 36, 36, 0.3) 100%);
      border-left: 4px solid #8B3A3A;
      padding: 18px;
      margin: 30px 0;
      border-radius: 8px;
      border: 1px solid rgba(139, 58, 58, 0.4);
    }
    .reason-text {
      margin: 0;
      color: #FFCD8D;
      font-size: 14px;
      line-height: 1.6;
    }
    .footer {
      background: linear-gradient(135deg, #0B0102 0%, #190204 100%);
      padding: 30px;
      text-align: center;
      border-top: 1px solid rgba(255, 205, 141, 0.1);
    }
    .footer-text {
      margin: 0 0 8px 0;
      color: #9b7a6f;
      font-size: 13px;
    }
    .footer-copyright {
      margin: 8px 0 0 0;
      color: #6b5651;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
<h1 class="site-title">The Sandbox 3.0</h1>
      <p class="subtitle">IEEE ITB Student Branch</p>
    </div>

    <div class="content">
      <h2 class="title">Registration Update for ${teamName}</h2>

      <p class="text">Dear ${name},</p>
      
      <p class="text">Thank you for your interest in participating in The Sandbox 3.0. Unfortunately, we regret to inform you that your team registration could not be approved at this time.</p>

      ${reason
      ? `
      <div class="reason-box">
        <p class="reason-text" style="margin: 0;"><strong>Reason:</strong></p>
        <p class="reason-text" style="margin: 8px 0 0 0;">${reason}</p>
      </div>
      `
      : ''
    }

      <p class="text">If you believe this is a mistake or have questions, please don't hesitate to contact us.</p>
    </div>

    <div class="footer">
      <p class="footer-text">
        Contact us at 
        <a href="mailto:sandbox@ieee-itb.org" style="color: #FFCD8D; text-decoration: none;">
          sandbox@ieee-itb.org
        </a>
      </p>
      <p class="footer-copyright">
        © 2026 The Sandbox - IEEE ITB Student Branch. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to,
      subject: 'Registration Update - The Sandbox 3.0',
      html,
    });

    console.log(`✅ Rejection email sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send rejection email:', error);
    throw error;
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  to: string,
  name: string,
  token: string
) {
  const resetUrl = `${BASE_URL}/reset-password?token=${token}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(180deg, #0B0102 0%, #190204 50%, #0B0102 100%);
      min-height: 100vh;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #1a0405;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      border: 2px solid rgba(255, 205, 141, 0.2);
    }
    .header {
      background: linear-gradient(135deg, #190204 0%, #2d0609 100%);
      padding: 40px 30px;
      text-align: center;
    }
.site-title {
      margin: 0;
      background: linear-gradient(90deg, #FFCD8D 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .subtitle {
      margin: 8px 0 0 0;
      color: #E8B4A8;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    .content {
      padding: 40px 30px;
      background-color: #1a0405;
    }
    .title {
      margin: 0 0 20px 0;
      background: linear-gradient(90deg, #FFCD8D 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 28px;
      font-weight: bold;
    }
    .text {
      margin: 0 0 16px 0;
      color: #E8B4A8;
      font-size: 16px;
      line-height: 1.7;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #8B3A3A 0%, #5A2424 100%);
      color: #FFFFFF;
      text-decoration: none;
      padding: 18px 45px;
      border-radius: 12px;
      font-weight: bold;
      font-size: 16px;
      box-shadow: 0 8px 25px rgba(139, 58, 58, 0.4);
      border: 1px solid rgba(255, 205, 141, 0.3);
      letter-spacing: 0.5px;
    }
    .button-container {
      text-align: center;
      margin: 35px 0;
    }
    .warning-box {
      background: linear-gradient(135deg, rgba(139, 58, 58, 0.2) 0%, rgba(90, 36, 36, 0.2) 100%);
      border-left: 4px solid #8B3A3A;
      padding: 18px;
      margin: 30px 0;
      border-radius: 8px;
      border: 1px solid rgba(139, 58, 58, 0.3);
    }
    .warning-text {
      margin: 0;
      color: #FFCD8D;
      font-size: 14px;
      line-height: 1.6;
    }
    .link {
      color: #FFCD8D;
      text-decoration: none;
      word-break: break-all;
      font-size: 13px;
    }
    .link-box {
      margin: 8px 0 0 0;
      padding: 12px;
      background: rgba(255, 205, 141, 0.05);
      border-radius: 6px;
      border: 1px solid rgba(255, 205, 141, 0.1);
    }
    .footer {
      background: linear-gradient(135deg, #0B0102 0%, #190204 100%);
      padding: 30px;
      text-align: center;
      border-top: 1px solid rgba(255, 205, 141, 0.1);
    }
    .footer-text {
      margin: 0 0 8px 0;
      color: #9b7a6f;
      font-size: 13px;
    }
    .footer-copyright {
      margin: 8px 0 0 0;
      color: #6b5651;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
<h1 class="site-title">The Sandbox 3.0</h1>
      <p class="subtitle">IEEE ITB Student Branch</p>
    </div>

    <div class="content">
      <h2 class="title">Reset Your Password</h2>
      
      <p class="text">Hi ${name},</p>
      
      <p class="text">We received a request to reset your password for your Sandbox account. Click the button below to create a new password:</p>

      <div class="button-container">
        <a href="${resetUrl}" class="button">
          Reset Password
        </a>
      </div>

      <div class="warning-box">
        <p class="warning-text">
          <strong>Important:</strong> This password reset link will expire in <strong>1 hour</strong> for security reasons.
        </p>
      </div>

      <p class="text" style="color: #9b7a6f; font-size: 14px;">
        If the button doesn't work, copy and paste this link into your browser:
      </p>
      <div class="link-box">
        <a href="${resetUrl}" class="link">${resetUrl}</a>
      </div>

      <div style="margin-top: 30px; padding: 15px; background: rgba(139, 58, 58, 0.15); border-radius: 8px; border: 1px solid rgba(139, 58, 58, 0.2);">
        <p class="text" style="margin: 0; font-size: 14px; color: #E8B4A8;">
          <strong style="color: #FFCD8D;">Didn't request this?</strong><br>
          If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
        </p>
      </div>
    </div>

    <div class="footer">
      <p class="footer-text">
        Need help? Contact us at 
        <a href="mailto:sandbox@ieee-itb.org" style="color: #FFCD8D; text-decoration: none;">
          sandbox@ieee-itb.org
        </a>
      </p>
      <p class="footer-copyright">
        © 2026 The Sandbox - IEEE ITB Student Branch. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to,
      subject: '🔒 Reset Your Password - The Sandbox 3.0',
      html,
    });

    console.log(`✅ Password reset email sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send password reset email:', error);
    throw error;
  }
}
