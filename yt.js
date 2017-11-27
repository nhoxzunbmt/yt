var ffmpeg = require('fluent-ffmpeg');
// var name = 'vid';
// var path = 'assets/step_1.png';

// var output;

// var proc = new ffmpeg();
// proc.mergeAdd('assets/step_4.png').loop(5);
// proc.mergeAdd('assets/step_1.png').loop(5);

// proc.complexFilter([{
//     filter: "nullsrc",
//     options: { size: "640x360" },
//     outputs: "background"
// },
//     { filter: "overlay", options: "shortest=1:x='min(-(t)*20,0)'", inputs: ['[background]', '[0:v]'], outputs: 'input1' },
//     { filter: "overlay", options: "shortest=1:x='min(-(t)*20,0)'", inputs: ['[input1]', '[1:v]'], outputs: 'vid' },
// ], output);
// proc.videoCodec('libx264');
// proc.outputOptions([
//     '-map [vid]'
// ]);
// proc.output('merged.mp4');
// proc.run();
// proc.on('progress', function(progress) {
//     if (progress.percent != null) {
//         console.log('vert: ' + progress.percent + '% done');
//     } else {
//         console.log('vert: ' + JSON.stringify(progress) + ' done');
//     }
// });

// proc.on('start', function(ffmpegCommand) {
//     console.log(ffmpegCommand);
// });


// proc.on('error', function(err, stdout, stderr) {
//     console.log("-video: " + err);
// });

// proc.on('end', function() {
//     console.log('Merging file is ended.');
// });




  var proc = new ffmpeg(),
      filelist = `images.txt`, // the dynamically created text file noted above
      tempFile = `tempbg.mp4`, // output file name
      FPS = 30; // frames-per-second - I have a setting for this in my html

  proc.addInput(filelist)
  .inputOptions(['-safe 0','-f concat'])
  .on('start', function(ffmpegCommand) {
      console.log(`started creating bg video`);
  })
  .on('progress', function(data) {
      console.log('progressing');
  })
  .on('end', function() {
      console.log(`ended creating bg video`);
  })
  .on('error', function(err, stdout, stderr) {
      /// error handling
      console.log('error: ' + err.message);
      console.log('stderr:' + stderr);
      console.log('stdout:' + stdout);
  })
  .outputOptions([`-vf fps=${FPS}`,'-pix_fmt yuv420p'])
  .output(tempFile)
  .run();
