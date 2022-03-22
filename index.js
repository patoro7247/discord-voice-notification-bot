
const config = require('./config.json')
const { Client } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource} = require('@discordjs/voice');
const { join } = require('node:path');


var bot = new Client({ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_VOICE_STATES",]});

var isReady = true;
// Tracks Specified User's ID, looks at every presence update, "follows" user and plays audio file

//If User joins channel

//Function that routes audiofile path to name
let audioIDObject = [
  {
    name: 'Doggy',
    id: 255485330524864512,
    audioSrc: 'blockedUser.mp3'
  },
  {
    name: 'Pat',
    id: 363520483376758785,
    audioSrc: 'baldhead.mp3'
  },
  {
    name: 'RobbyD',
    id: 286707430132285440,
    audioSrc: ''
  },
  {
    name: 'High',
    id: 269904711929298944,
    audioSrc: 'whyareyourecording.mp3'
  },
  {
    name: 'Benny',
    id: 147570113548255232,
    audioSrc: ''
  },
  {
    name: 'Richi',
    id: 227920990074699778,
    audioSrc: 'baldhead.mp3'
  },
  {
    name: 'Trevor',
    id: 208044531495469056,
    audioSrc: 'stupididiot.mp3'
  },
  {
    name: 'Seth',
    id: 638022005878292502,
    audioSrc: ''
  },
  {
    name: 'Dsmizzy',
    id: 256259532580192256,
    audioSrc: ''
  },
  {
    name: 'Ryan',
    id: 475772240332455976,
    audioSrc: 'hehestupid.mp3'
  },
  {
    name: 'Keegan',
    id: 948440508043255848,
    audioSrc: 'lungbuster.mp3'
  },
  {
    name: 'Trix',
    id: 955221091771645952,
    audioSrc: 'lungbuster.mp3'
  },
]
bot.on('voiceStateUpdate', (oldstate, newstate) => {
  // If one of these Id's is present, then do the rest

  if (newstate.guild.id == 722573341327622155) return;
  if( newstate.id == 954634572925128774) return;
  if (isReady)
  {
    isReady = false;


    let audioFilePath = './audio/'
      
    audioIDObject.forEach(element => {
      if( newstate.id == element.id){
        audioFilePath = join(audioFilePath, element.audioSrc)
      }
        
    })

    const player = createAudioPlayer()
    
    const connection = joinVoiceChannel({
      channelId: newstate.channelId,
      guildId: newstate.guild.id,
      adapterCreator: newstate.guild.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: false
    }).subscribe(player)
    
    let resource = createAudioResource(audioFilePath)

    player.play(resource)

    if(player.state == 'idle') {
      connection.disconnect()
    }

    isReady = true;
  }

});

// ID of bot is 954634572925128774

bot.login(config.token);
