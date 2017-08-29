function SyncTimeout(callback, n)
{
    var curr = new Date();
    var end = new Date();
    while(end - curr <= n)
    {
        end = new Date();
    }

    callback();
}

function Print()
{
    console.log("World!");
}

console.log("Hello ");
SyncTimeout(Print, 5000);