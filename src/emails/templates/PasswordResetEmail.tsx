import { PasswordResetEmailData } from '../types/email.types'

export function renderPasswordResetEmail(data: PasswordResetEmailData): string {

    const resetUrl = `${data.url}/auth/reset-password`

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Reestablece tu Password</title>
      </head>
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Reestablece tu Password</h1>
          <p>Hola <strong>${data.name}</strong>,</p>
          <p>Has solicitado reestablecer tu password en Meeti.</p>
          
          <div style="margin: 30px 0;">
            <a 
              href="${resetUrl}" 
              target="_blank"
              style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;"
            >
              Reestablecer Password
            </a>
          </div>

          
          <p style="color: #999; font-size: 12px; margin-top: 40px;">
            Si no solicitaste este cambio, puedes ignorar este email.
          </p>
        </div>
      </body>
    </html>
  `
}

export function renderPasswordResetEmailText(data: PasswordResetEmailData): string {
    const resetUrl = `${data.url}/auth/reset-password`

    return `
    Hola ${data.name},
    
    Has solicitado reestablecer tu password en Meeti.
    
    Visita el siguiente enlace:
    ${resetUrl}
  `
}