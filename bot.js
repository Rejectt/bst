const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "$"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});


client.on('guildMemberAdd', member => {
  var embed = new Discord.RichEmbed()
  .setTitle(" 😃 عضو جديد دخل السيرفر")
  .setColor("RANDOM")
  .addField("اسم العضو",`${member}`)
  .addField("ايدي العضو",`${member.id}`)
  .addField("رقم العضو",`${member.guild.memberCount}`)
  .setThumbnail("http://www.ymcaswkansas.org/sites/ymcaswkansas.org/files/civicrm/friend.png")
  var channel =member.guild.channels.find('name', 'bloody')
if (!channel) return;
      channel.send({embed : embed});
});

client.on('guildMemberRemove', member => {
  var embed = new Discord.RichEmbed()
  .setTitle("عضو غادر السيرفر")
  .setColor("RANDOM")
  .addField("اسم العضو",`${member}`)
  .addField("ايدي العضو",`${member.id}`)
  .addField("تبقى",`${member.guild.memberCount}`)
  .setThumbnail("https://cdn.onlinewebfonts.com/svg/img_948.png")
  var channel =member.guild.channels.find('name', 'bloody')
  if (!channel) return;
        channel.send({embed : embed});
  });

client.on("message", (message) => {
   if (message.content.startsWith("$new")) {
        const reason = message.content.split(" ").slice(1).join(" ");     
        if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
        if (message.guild.channels.exists("name", "ticket-{message.author.id}" + message.author.id)) return message.channel.send(`You already have a ticket open.`);    
        message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Support Team");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });    
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: **تم إنشاء تذكرتك ، #${c.name}.**`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(`مرحباّ ${message.author.username}!`, `يرجى محاولة شرح سبب فتح هذه التذكرة بأكبر قدر ممكن من التفاصيل. سيكون فريق الدعم لدينا قريبا للمساعدة.`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error);
    }
 
 
  if (message.content.startsWith("$close")) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
 
        message.channel.send(`هل أنت متأكد؟ بعد التأكيد ، لا يمكنك عكس هذا الإجراء!\n للتأكيد ، اكتب\`*confirm\`. سيؤدي ذلك إلى مهلة زمنية في غضون 10 ثوانٍ وإلغائها`)
            .then((m) => {
                message.channel.awaitMessages(response => response.content === '$confirm', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })   
                    .then((collected) => {
                        message.channel.delete();
                    })    
                    .catch(() => {
                        m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                            m2.delete();
                        }, 3000);
                    });
            });
    }
 
});

client.on('message',async msg => {
  var p = "$";//Toxic Codes
  if(msg.content.startsWith(p + "setuser")) {
  if(!msg.guild.member(msg.author).hasPermissions('MANAGE_CHANNELS')) return msg.reply('❌ **ليس لديك صلاحيه**')
  if(!msg.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS'])) return msg.reply('❌ **البوت لا يمتلك صلاحية**')
  msg.guild.createChannel(`Members : ◤ → ${client.users.size} ← ◢` , 'voice').then(time => {
    });

  }
 
});

client.on('message', message => {
             if (!message.channel.guild) return;
      if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = message.content.split(" ").slice(1);
  
  if (command === 'invites') {
    message.guild.fetchInvites().then(invs => {
      let member = client.guilds.get(message.guild.id).members.get(message.author.id);
      let personalInvites = invs.filter(i => i.inviter.id === message.author.id);
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
    return message.reply(`**${inviteCount}: عدد الاشخاص الذي دعوتهم هو**`)

});
}});

client.on('message', message => {
        if (message.content.toLowerCase() === (prefix + "بوت") {
            if(!message.channel.guild) return;
        let embed = new Discord.RichEmbed()
        .setTitle(`:small_orange_diamond: اضغط هنا لتضم البوت عندك في السيرفر. `)
        .setURL(`https://discordapp.com/api/oauth2/authorize?client_id=531064404825866252&permissions=8&scope=bot`)
     message.channel.sendEmbed(embed);
       }
   });

client.on('message', message => {
 if(message.content.split(' ')[0].toLowerCase() == (prefix + 'avatar') {
     if(message.author.bot) return;
        if(!message.channel.guild) return message.reply(' Error : \` Guild Command \`');
        var mentionned = message.mentions.users.first();
    var x5bzm;
      if(mentionned){
          var x5bzm = mentionned;
      
        const embed = new Discord.RichEmbed()
.setColor('#36393e')
        .setImage(`${x5bzm.avatarURL}`)
        .addField('Requested By:', message.author.tag)
      message.channel.sendEmbed(embed);
      }
    }
});

 
 
 
client.login(process.env.BOT_TOKEN);
