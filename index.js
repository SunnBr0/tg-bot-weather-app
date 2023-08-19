const TelegramBot = require('node-telegram-bot-api');
const fetch = require("node-fetch")
const token = '6191937600:AAE721YQfWKLEkkmi_tLwZgRdD5_ovel0FM';

async function outTemp(latitude,longitude){
	return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
		.then(data=>data.json())
		.then(json=>json.current_weather.temperature)
		
}

const bot = new TelegramBot(token,{polling:true})

	const keyboard = [
	[
	  {
		text: 'Воронеж', // текст на кнопке
		callback_data: 'Voronez' // данные для обработчика событий
	  }
	],
	[
	  {
		text: 'Грязи',
		callback_data: 'Gryzi'
	  }
	],
	[
		{
		  text: 'Москва',
		  callback_data: 'Moskow'
		}
	  ],
	[
	  {
		text: 'Погода в Яндексе',
		url: 'https://htmlacademy.ru/courses' //внешняя ссылка
	  }
	]
  ];
  
  bot.on('message',(msg)=>{
	  const chatId = msg.chat.id
	  bot.sendMessage(chatId,'Выберите город:',{
		reply_markup:{
			inline_keyboard: keyboard
		}
	  });
  })
bot.on("callback_query",async (query)=>{
	const chatId = query.message.chat.id

	let current_temp = 0
	if(query.data === "Voronez"){
		await outTemp(51.6875,39.1875).then(data=>current_temp = data)
	}
	if(query.data === "Moskow"){
		await outTemp(55.755,37.617).then(data=>current_temp = data)
	}
	if(query.data === "Gryzi"){
		await outTemp(52.7942,39.1558).then(data=>current_temp = data)
	}
	if(current_temp !=0 ){
		bot.sendMessage(chatId,`Температура ${current_temp}`,{
			reply_markup:{
				inline_keyboard: keyboard
			}
		})
	}else{
		bot.sendMessage(chatId,"Ошибка ",{
			reply_markup:{
				inline_keyboard: keyboard
			}
		})
	}
	

})


