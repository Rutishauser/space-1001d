var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : '10.10.33.6',
  user     : 'lhf',
  password : 'password',
  database : 'qtree',
  insecureAuth: true
});

connection.connect();

var table = 
connection.query('SELECT * from FreqN LIMIT 200000', function(err, rows, fields) {
  if (!err)
  {
    // console.log('The solution is: ', rows);
    write(rows);
  }
  else
    console.log('Error while performing Query. ' + err);
});

connection.end();


function write(table)
{
    create(table);
    for(var j=0; j != table.length; j++)
    {
	//console.log("* " + table[j].Word + ", " + table[j].Sem );
    }
}

function create(table)
{
    // Require the sqlite3 library. Use the 'verbose()'-flag to show stack traces while running queries.
    var sqlite3     = require('sqlite3').verbose();
    var fs          = require('fs');
 
    // Setup database:
    var dbFile = './dictionary.db';
    var dbExists = fs.existsSync(dbFile);
 
    // If the database doesn't exist, create a new file:
    if(!dbExists)
    {
	fs.openSync(dbFile, 'w');
    }
 
    // Initialize the database:
    var db = new sqlite3.Database(dbFile);
 
    // Optional installation for newly created databases:

// dbExists = false;

    if(!dbExists)
    {
	db.run('CREATE TABLE `FreqN` (' + '`N` INTEGER PRIMARY KEY,' + '`Weight` INTEGER)');
    }

  if(dbExists)
  {
    var statement = db.prepare('INSERT INTO `FreqN` (`N`, `Weight`) ' + 'VALUES (?, ?)');

    for(var j=0; j != table.length; j++)
    {
	console.log("* " + j + ". " + table[j].N + ", " + table[j].Weight );

	statement.run( table[j].N , table[j].Weight );
    }
    statement.finalize();
  }

    // Close the database:
    db.close();

}




