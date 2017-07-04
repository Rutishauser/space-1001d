
 console.log("START");

 // Global

 // Reader
 var Reader = require('./nlp/Reader');
 var reader = new Reader();

 // Content
 var Content = require('./data/Content');
 var content = new Content();

 // Call Speech Service
 var SpeechService = require('./speech/Source');
 var speech = new SpeechService();

 // RUN

 f0();

 function f0(cb)
 {
    // to set the listener
    speech.listen(f1);
 }

 // Speech Callback
 function f1(s)
 {
    console.log("* Sentence: '" + s + "'" );
    f2(s);
 }

 function f2(x)
 {
    reader.read(x, f3);
 }

 function f3(x)
 {
    console.log("* Vector: "); console.log(x);

    var y = content.find();

    console.log("* Answer: " + y);
    f4(y);
 }

function f4(x)
 {
    console.log("* Read: " + x);
 }

 // END
