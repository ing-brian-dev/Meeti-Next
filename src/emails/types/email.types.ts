export type EmailAddress = {
  name: string
  email: string
}

export type VerificationEmailData = {
  name: string
  email: string
  url: string
}

export type PasswordResetEmailData = {
  name: string
  email: string
  url: string
}

export type EmailOptions = {
  from: string
  to: string
  subject: string
  text: string
  html: string
}