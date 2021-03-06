const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `Ya te as registrado\nQuiere volver a registrarte? ${usedPrefix}unreg <SN|SERIAL NUMBER>`
  if (!Reg.test(text)) throw `Formato incorrecto\n*${usedPrefix}lista nombre.edad*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Hey como te llamas, el nombre no puede estar estar vacΓ­o (Alphanumeric)'
  if (!age) throw 'Hey Cuantos aΓ±os tienesπ₯±'
  age = parseInt(age)
  if (age > 120) throw 'Amigo deja el wssp, y mΓ©tete al asilo π'
  if (age < 5) throw 'Los bebΓ©s no deben tener ni celular'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
γ REGISTRO EXITOSO γ
β₯β₯β₯β₯β₯β₯β₯β₯β₯β₯
ββββββββ
β²  *Informacion* 
ββββββββ
β₯β₯β₯β₯β₯β₯β₯β₯β₯β₯
------------------------------
β¬ \`\`\`Nombre: ${name}\`\`\`
β¬ \`\`\`Edad: ${age} aΓ±os\`\`\`
β¬ \`\`\`SN: ${sn}\`\`\`
------------------------------
β₯β₯β₯β₯β₯β₯β₯β₯β₯β₯
ββββββββ
β *NOTA*
β NO VAYAS A PERDER TU *SN* POR QUE ES MUY IMPORTANTE:D
ββββββββ
β₯β₯β₯β₯β₯β₯β₯β₯β₯β₯
`.trim())
}
handler.help = ['reg'].map(v => v + ' βΏα΅α΅α΅Κ³α΅/α΅α΅α΅α΅')
handler.tags = ['exp']

handler.command = /^(daftar|reg(ister)?)$/i

module.exports = handler

