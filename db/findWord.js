
// var V = test('point', log);

// module.export = function()
// {

    // Require the sqlite3 library. Use the 'verbose()'-flag to show stack traces while running queries.
    var sqlite3     = require('sqlite3').verbose();
    var fs          = require('fs');

    // Setup database:
    var dbFile = './db/dictionary.3.db';
    var dbExists = fs.existsSync(dbFile);

    // If the database doesn't exist, create a new file:
    if(!dbExists)
    {
      console.log("ERROR: " + dbFile + " does not exist.");
    }

    // Initialize the database:
    this.db = new sqlite3.Database(dbFile);

  this.find = function ( X, cb )
  {
    var V = 26107; // 'one'

    this.db.all("SELECT * FROM Dictionary WHERE Word = ?", X, function(err, rows) {
      if(err) console.log('err:', err);
      // console.log('rows:', rows);

      if(rows.length != 1) console.log("Word Not Found: '" + X + "', L=" + rows.length);
      if(rows.length == 1) V = rows[0].N;
      // console.log(V);

      cb(null, V );
    });

    // Close the database:
    // this.db.close();
  }

  this.weight = function ( N, cb )
  {
    var V = 255; // seldom

    this.db.all("SELECT * FROM Freq WHERE N = ?", N, function(err, rows) {
      if(err) console.log('err:', err);
      // console.log('rows:', rows);

      if(rows.length != 1) console.log("Weight 255 for " + N + ", L=" + rows.length);
      if(rows.length == 1) V =  rows[0].Weight;
      // console.log(N, V);

      cb(null, [N,V] );
    });

    // Close the database:
    // this.db.close();
  }

  this.root = function ( NX, cb )
  {
    this.db.all("SELECT * FROM Root WHERE NX = ?", NX, function(err, rows) {
      if(err) console.log('err:', err);
      // console.log('NX rows:', rows);

      var V = NX;

      if(rows.length != 1) console.log("Root: " + NX + ", L=" + rows.length);
      if(rows.length == 1) V = rows[0].N;

      cb(null, V);
    });

    // Close the database:
    // this.db.close();
  }

  this.sense = function ( A, cb )
  {
    // console.log("SELECT * FROM Sense WHERE N = ?", A[0]);

    this.db.all("SELECT * FROM Sense WHERE N = ?", A[0], function(err, rows) {

      if(err) console.log('err:', err);

      // console.log("senses:", rows);
      console.log("senses for " + A[0] + ", L=" + rows.length);

      var ss = [];

      for(I in rows)
      {
        // console.log("*", rows[I] );

        ss.push( [ rows[I].Sem, A[1] ] );
      }

      cb(null, ss)

      // THE FIX
      // if(rows.length == 0) cb(null, [] );
    });

    // Close the database:
    // this.db.close();
  }

// }
