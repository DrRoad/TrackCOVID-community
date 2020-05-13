require('dotenv').config()
const fs = require('fs')

console.log('Building .env files...')

const appVars = [
  { originalName: 'APP_NAME', newName: 'REACT_APP_NAME' },
  { originalName: 'APP_THEME', newName: 'REACT_APP_THEME' },
  { originalName: 'ABOUT_URL', newName: 'REACT_APP_ABOUT_URL' },
  { originalName: 'ESTIMATED_DX_DELAY_DAYS', newName: 'REACT_APP_ESTIMATED_DX_DELAY_DAYS' },
  { originalName: 'CONTACT_WINDOW_HOURS_BEFORE', newName: 'REACT_APP_CONTACT_WINDOW_HOURS_BEFORE' },
  { originalName: 'CONTACT_WINDOW_HOURS_AFTER', newName: 'REACT_APP_CONTACT_WINDOW_HOURS_AFTER' }
]

const adminVars = [
  { originalName: 'APP_NAME', newName: 'REACT_APP_NAME' },
  { originalName: 'APP_URL', newName: 'REACT_APP_WEB_APP_URL' },
  { originalName: 'ADMIN_REGISTRATION_URL', newName: 'REACT_APP_REGISTRATION_URL' }
]

const buildNewEnvFile = (newVars) => {
  return newVars.map(newVar => {
    const value = process.env[newVar.originalName]
    if (typeof value !== 'undefined') {
      return `${newVar.newName}=${value}`
    } else {
      throw new Error(`Environment variable not set: ${newVar.originalName}`)
    }
  }).join('\n')
}

const appEnvFile = buildNewEnvFile(appVars)
const adminEnvFile = buildNewEnvFile(adminVars)

fs.writeFileSync('./app/.env', appEnvFile)
fs.writeFileSync('./admin/.env', adminEnvFile)

console.log('.env files built successfully')
