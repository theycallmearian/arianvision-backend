const { execSync } = require('child_process')
const path = require('path')

try {
  console.log('🔄 Iniciando seed de Usuarios...')
  execSync(`node ${path.join(__dirname, 'users.js')}`, { stdio: 'inherit' })

  console.log('\n🔄 Iniciando seed de Eventos...')
  execSync(`node ${path.join(__dirname, 'events.js')}`, { stdio: 'inherit' })

  console.log('\n🎉 Seed completada correctamente.')
} catch (err) {
  console.error('\n❌ Error durante el seed combinado:', err.message)
  process.exit(1)
}
