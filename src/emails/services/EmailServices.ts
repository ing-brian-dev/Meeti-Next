
import { transporter } from '@/src/lib/nodemailer'
import { EmailOptions } from '../types/email.types'

export class EmailService {
    static async send(options: EmailOptions): Promise<void> {
        try {
            const info = await transporter.sendMail(options)
            console.log('Email enviado:', info.messageId)
        } catch (error) {
            console.error('Error enviando email:', error)
            throw new Error('No se pudo enviar el email')
        }
    }
}