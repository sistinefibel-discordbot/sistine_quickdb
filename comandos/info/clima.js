const Discord = require('discord.js'); // puxando a livraria 'discord.js'
const weather = require('weather-js'); // puxando o NPM 'weather-js' (instale utilizando: npm i weather-js)
const config = require('../../config.json')

exports.run = (doky, message, args) => { // setando a base
  if (!args[0]) {
            return message.channel.send(new Discord.MessageEmbed()
                .setTitle("**<:dokyerro:700492899833479249> » Uso incorreto do comando**")
                .setDescription("<:dokypin1:700516924404269056> › Tente usar ``" + `${config.prefix}${this.help.name} RJ` + "``")
                .addField('**Alternativas**', `\`${this.help.aliases}\``, false)
                .addField('**Permissões**', `\`nenhum\``, false)
                .setColor('2f3136'));
        }

  
  weather.find({ // puxando os detalhes do npm
        search: args, // definindo argumentos
        degreeType: 'C' // o detalhe setado: C de Graus Celcius
    }, function (err, result) { // caso ache um erro
        if (err) message.channel.send(err); // enviaremos no console
      
        var txt = args.slice(0).join(' ');
      
        // caso o bot não encontre a cidade
        if (!txt) return message.reply(`<:dokyerro:700492899833479249> » desculpe, mas não encontrei essa cidade!`)
        let embed = new Discord.MessageEmbed()
            .setDescription(`
**${result[0].location.name}**\n
**☀️ Temperatura** ${result[0].current.temperature}°C\n
**🌡️ Sensação Térmica** ${result[0].current.feelslike}°C\n
**💦 Umidade** ${result[0].current.humidity}%\n
**💨 Vento** ${result[0].current.windspeed}`)
            .setColor('#2f3136')
            .setImage(result[0].current.imageUrl)

        message.channel.send(embed)

    });
};
exports.help = {
    name: 'clima',
  aliases: ["tempo"]
  };