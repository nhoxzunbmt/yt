/*
https://ffmpeg.zeranoe.com/builds/
https://www.npmjs.com/package/shelljs
https://www.npmjs.com/package/ytdl
https://github.com/fent/node-ytdl-core
https://github.com/fluent-ffmpeg/node-fluent-ffmpeg
https://www.toptal.com/javascript/javascript-promises
https://github.com/tildeio/rsvp.js
https://www.sitepoint.com/nodejs-events-and-eventemitter/
https://stackoverflow.com/questions/11447872/callback-to-handle-completion-of-pipe#11448311
var parentDir = path.resolve(process.cwd(), '.');
var DIR = '\'' + parentDir + '\'';
shell.cd(DIR);
var videoID = '0RxBHRZpIdg';
var link = 'ytdl --filter audioonly -o "{author.name} - {title}" http://www.youtube.com/watch?v=' + videoID;
console.log(link);
*/

var shell = require('shelljs');
/*
shell.cd("download");
shell.exec("ll").code;
shell.rm('-r', '*.mp4');
*/



var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
var path = require('path')
var rsvp = require('rsvp');
var events = require('events');
const ytdl  = require('ytdl-core');
var index = 0;
//var url = "https://www.youtube.com/watch?v=feA64wXhbjo";
	//url = 'https://www.youtube.com/watch?v=' + links[index];


var dir = path.resolve(process.cwd(), '.');

var event = new events.EventEmitter();

var  title = "";


var links = [
		"s6b5nOnojaU","akD-L8q6v68","QMAxL1lYFuI"];/*,,"AHGvaQMClEo","GPx-cJtKNwo",
	"yjxXY6SLZZU","4l9Mx0TuiDw","H08qXcqSEJ4","gsG-9k_IjzI","4l9Mx0TuiDw"
];*/

for(var i in links){
	links[i] = 'https://www.youtube.com/watch?v=' + links[i];
}
/*

var promises = links.map(function(id){
  return  url + id;
});



rsvp.all(promises).then(function(posts) {
	
	console.log("posts: ",posts,", Leng :", promises.length);
}).catch(function(reason){
  print("ERROR: ", reason);
});
console.log(promises[0]);
r(promises);


var x = 0;
function r(arr){
	index = index || 0;

	if( arr.length === 0){
		console.log("Exit case",arr.length);
		event.emit("finished");
	}else{
		arr.pop();
		
		var i = arr[r(arr)];
				console.log(i );

		return i ;
	}
		
}*/

console.log('Start');

for(var i in [0,0]){
ytdl.getInfo(links[index],function(err, info){
		var insideIndex = i;
		title = info.title;
		event.emit('title',info.title);
		event.emit('update', index);
		//console.log("Title : ",title, "\nURL:", links[index], i, index,insideIndex);
});

event.on("title", function(){
		console.log("Title : ",title, "\nURL:", links[index], i, index);

	var stream = ytdl(links[index],{ filter: "audioonly"})
		.pipe(
			fs.createWriteStream("./download/" + title + ".mp4" )
			);


	stream.on('finish', function (err) { 
		ffmpeg({source: "./download/" + title + ".mp4" })
		.format('mp3').save("./download/" + title + ".mp3")
		.on('end', 
			function() {
				console.log('Finished processing : ', title);
				//if(links.length === index){
					//print("worked!");
					//event.emit('finished');
				//}

			}
		);

	});

});









}
//cleanupFiles at end
event.on('finished',
	function(){
			shell.ls("download/*");
			setTimeout(function(){
				shell.rm('-r', 'download/*.mp4');
			}, 5000);
			shell.exit(1);
	}
);

event.on('update',
	function(){
		index +=1;
		url = links[index];
	}
);
console.log("server is running!");
function print(x){console.log(x);}
