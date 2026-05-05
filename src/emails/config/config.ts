export const emailConfig = {
  from: {
    verification: 'Meeti <cuentas@meeti.com>',
    passwordReset: 'Meeti <admin@meeti.com>',
    default: 'Meeti <noreply@meeti.com>'
  },
  tokenExpiration: '1 hora'
} as const