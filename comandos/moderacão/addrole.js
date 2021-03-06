const Discord = module.require('discord.js'); //exporta a npm discord.js
const ms = require('ms'); 
//const config = require('../config.json')

exports.run = async (doky, message, args) => {
  
  if(message.member.hasPermission("MANAGE_ROLES")) {
            let member2 = message.mentions.members.first();
            if(!member2) {
            return message.channel.send(new Discord.MessageEmbed()
                .setTitle("**<:dokyerro:700492899833479249> » Uso incorreto do comando**")
                //.setDescription("<:dokypin1:700516924404269056> › Tente usar ``" + `${config.prefix}${this.help.name} @usuario @cargo` + "``")
                .addField('**Alternativas**', `\`${this.help.aliases}\``, false)
                .addField('**Permissões**', `\`Gerenciar Cargos\``, false)
                .setColor('2f3136'));
        }
            //Se o usuario mencionar um cargo inxesitente ele retornará esta mensagem de erro
            let muteRole2 = message.mentions.roles.first();
            if(!muteRole2) return message.reply("<:dokyerro:700492899833479249> " + `» Mencione um ususario existente!`);
            
            let time2 = args[2];
            if(!time2) {//adiciona o cargo mencionado ao usuario
              member2.roles.add(muteRole2.id);
              //Se o usuario não definir um tempo ele irá adicionar o cargo permanente
              message.channel.send(`<:dokycerto:700492893651075112> » ${member2}` + ` Você recebeu o cargo permanente: ` + `${muteRole2.name}`);
            }else {
              //adiciona o cargo ao usuario
              member2.roles.add(muteRole2.id);
              //Se o usuario definir um tempo ele retornara esta mensagem
              message.channel.send(`<:dokycerto:700492893651075112> » ${member2} `+ ` Você recebeu o cargo: ` + `${muteRole2.name}` + ` durante: ${ms(ms(time2), {long: true})}`);

              setTimeout(function(){
                //remove o cargo de um usuario
                member2.roles.remove(muteRole2.id);
                //Retorna a mensagem de que o usuario perdeu o cargo
                message.channel.send(`<:dokycerto:700492893651075112> » ${member2} ` + ` seu cargo foi retirado de você, sua glória durou: ${ms(ms(time2), {long: true})}`)

              }, ms(time2));

              };
              }else {
                //Se o usuario não tiver a permissão nescessaria ele retornara esta mensagem de erro
                return message.reply("<:dokyerro:700492899833479249> » Você precisa da permissão de: `ADMINISTRATOR` para utilizar este comando.")
              };
}
//exporta a ajuda quando o usuario mandar prefix + name
module.exports.help = {
    name: "addrole",
    aliases: ["adicionarcargo", "cargoadd"]
}