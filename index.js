const Discord = require("discord.js");
const client = new Discord.Client();

const Token = "NzQ5MTQzMDIzMjE2MjMwNDgy.X0nrzw.W39cTI0kL9R0mI5TUs0LRCJSqWA"; 
const BotName = "루피 DM봇";
const Prefix = "!";

client.on("ready", () => {
    console.log(BotName + " Started!\nBot Start: " + new Date().toLocaleString() + "\nBot Token: " + Token.split(".")[0] + "…");
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.toLowerCase().startsWith(Prefix + "dm1") && message.member.hasPermission("ADMINISTRATOR"))
    {
        const DMMessage = message.content.substring(Prefix.length + 4);
        await message.channel.send(" ```전체 DM이 전송 중 입니다!\n\n미리 보기:\n ``` " + DMMessage);
        await message.guild.members.fetch()
            .then(ms => ms.forEach(async m => {
                if (!m.user.bot)
                {
                    try
                    {
                        await m.send(DMMessage);
                    }
                    catch {}
                }
            }));
        await message.channel.send("```전체 DM이 모두 전송 되었습니다!\n(서버 인원이 많다면 메시지가 늦게 도착할 수 있습니다!)```");
    }
    else if (message.content.toLowerCase().startsWith(Prefix + "dm2") && message.member.hasPermission("ADMINISTRATOR"))
    {
        const DMEmbed = new Discord.MessageEmbed()
            .setTitle(BotName + " DM")
            .setColor("#0388fc")
            .setThumbnail("https://cdn.discordapp.com/attachments/743776342679748619/749153233347412049/ff4016915147760066745c00391a6f0c.jpg")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, size: 2048}))
            .setDescription(message.content.substring(Prefix.length + 4))
            .setFooter(message.guild.name)
            .setTimestamp();
        await message.channel.send("전체 DM이 전송 중 입니다!\n미리 보기:");
        await message.channel.send(DMEmbed);
        await message.guild.members.fetch()
            .then(ms => ms.forEach(async m => {
                if (!m.user.bot)
                {
                    try
                    {
                        await m.send(DMEmbed);
                    }
                    catch {}
                }
            }));
        await message.channel.send("전체 DM이 모두 전송 되었습니다!\n(서버 인원이 많다면 메시지가 늦게 도착할 수 있습니다!)");
    }
});

client.login(Token);