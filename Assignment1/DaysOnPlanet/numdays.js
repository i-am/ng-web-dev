function DaysBetDates(dt1, dt2)
{
    var ms = dt2-dt1;
    var days = ms/(1000*60*60*24);
    return Math.floor(days);
}

function DaysTillToday(dt1)
{
    return DaysBetDates(dt1, new Date());
}

module.exports = {  DaysBetDates:DaysBetDates,
                    DaysTillToday:DaysTillToday
};