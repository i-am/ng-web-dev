function forEach(array, callback)
{
    for(var i=0; i<array.length; i++)
    {
        callback(array[i]);
    }
}

function map(array, callback)
{
    var arr2 = new Array(array.length);
    for(var i=0; i<array.length; i++)
    {
        arr2[i] = callback(array[i]);
    }
    return arr2;
}

//example

function print(a)
{
    console.log(a);
}

function square(a)
{
    return a*a;
}

a1 = [1,2,3,4,5];
forEach(a1, print);
a2 = map(a1, square);
forEach(a2, print);