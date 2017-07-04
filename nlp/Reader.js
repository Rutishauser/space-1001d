

console.log("TO INIT DICTIONARY");

// Global

var Word = require("../db/findWord.js");
var simpleBarrier = require('simple-barrier');

module.exports = function()
{
    // create a barrier instance
    var barrierN = simpleBarrier();
    var barrierW = simpleBarrier();
    var barrierR = simpleBarrier();
    var barrierS = simpleBarrier();
    var cbF = null;

    // to split a sentence
    this.read = function(sentence, cb)
    {
	cbF = cb;

	var words = sentence.split(/,?\s+/);

        console.log("Read:", words);

	  for(N in words)
	  {
	    // console.log("+", words[N] );

	    // to find the word ids
	    Word.find( words[N], barrierN.waitOn() );
	  }
	
	barrierN.endWith(doWordIDs);
    }

    function doWordIDs(ids)
    {
        console.log('Ns:', ids);

	  for(J in ids)
	  {
	    // console.log("-", ids[J] );

	    // to find the roots
	    Word.root( ids[J], barrierR.waitOn() );
	  }

        barrierR.endWith(doRoots);
    }

    function doRoots(roots)
    {
        console.log('Roots:', roots);

          for(J in roots)
          {
            // to find the weights
	    Word.weight( roots[J], barrierW.waitOn() );
          }

        barrierW.endWith(doWeights);
    }

    function doWeights(AA)
    {
	console.log("Weights: ");
	console.log(AA);

	  // to compensate for repetitions
	  var M = 1.0 / AA.length;

	  for(J in AA)
	  {
	    AA[J][1] = AA[J][1] * M;
	  }

	// console.log("Weights: ", AA);

          for(J in AA)
          {
	    // to find the semantics
	    Word.sense( AA[J], barrierS.waitOn() );
          }

        // barrierS.endWith( console.log );
        barrierS.endWith(makePoint);
    }

    // to construct a point 
    function makePoint(BB)
    {
	var P = {};

	for(J in BB)
	{
	    if( BB[J].length != 0 )
	    {
		var CC = BB[J];
		for(K in CC)
		{
		    // console.log("CC:", CC[K]);
		    var DD = CC[K];

		    if( P.hasOwnProperty(DD[0]) )
		    {
		        P[ DD[0] ] = P[ DD[0] ] + DD[1];
		    }
		    else
		    {
		        P[ DD[0] ] = DD[1];
		    }
		}
	    }
	}

	// console.log(P);
	cbF( P );
    }

    //
};
