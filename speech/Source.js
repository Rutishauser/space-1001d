module.exports = function()
{
    this.A = 0;

    this.listen = function(fn, log)
    {
        fn( "who is the king of america", log );
    }

}