// a bunch of tests copy+pasted from the chronic date parser,
// by Tom Preston-Werner ❤️
// https://github.com/mojombo/chronic/edit/master/test/test_parsing.rb

const test = require('tape')
const spacetime = require('spacetime')
const nlp = require('./_lib')

const fmt = (iso) => (iso ? spacetime(iso).format('iso-short') : '-')

const mk = function (y, m, d, h, sec, mil) {
  let s = spacetime.now().year(y)
  if (m) {
    s = s.month(m - 1)
  }
  if (d) {
    s = s.date(d)
  }
  if (h) {
    s = s.hour(h)
  }
  if (sec) {
    s = s.second(sec)
  }
  if (mil) {
    s = s.millisecond(mil)
  }
  return fmt(s)
}

test('chronic-tests-one', (t) => {
  const nlpDate = function (str) {
    let context = {
      today: [2006, 8, 24],
    }
    let found = nlp(str).dates(context).json()[0] || {}
    found.date = found.date || {}
    return fmt(found.date.start)
  }

  t.equal(nlpDate('2012-08-02T13:00:00'), mk(2012, 8, 2, 13))
  t.equal(nlpDate('aug 3'), mk(2007, 8, 3, 12))
  t.equal(nlpDate('aug. 3'), mk(2007, 8, 3, 12))
  t.equal(nlpDate('aug-20'), mk(2007, 8, 20, 12))
  t.equal(nlpDate('may 27'), mk(2007, 5, 27, 12))
  t.equal(nlpDate('may 28'), mk(2007, 5, 28, 12))
  t.equal(nlpDate('may 28 5pm'), mk(2007, 5, 28, 17))
  t.equal(nlpDate('may 28 at 5pm'), mk(2007, 5, 28, 17))
  // t.equal(nlpDate('may 28 at 5:32.19pm'), mk(2006, 5, 28, 17, 32, 19))
  // t.equal(nlpDate('may 28 at 5:32:19.764'), mk(2007, 5, 28, 17, 32, 19, 764000))
  t.equal(nlpDate('5pm on may 28'), mk(2007, 5, 28, 17))
  t.equal(nlpDate('5pm may 28'), mk(2007, 5, 28, 17))
  t.equal(nlpDate('5 on may 28'), mk(2007, 5, 28, 5))
  t.equal(nlpDate('may 27th'), mk(2007, 5, 27, 12))
  t.equal(nlpDate('may 27th 5:00 pm'), mk(2007, 5, 27, 17))
  t.equal(nlpDate('may 27th at 5pm'), mk(2007, 5, 27, 17))
  // t.equal(nlpDate('may 27th at 5'), mk(2007, 5, 27, 5))
  // t.equal(nlpDate('fifteenth of this month'), mk(2007, 8, 15, 12))
  t.equal(nlpDate('22nd February'), mk(2007, 2, 22, 12))
  t.equal(nlpDate('31st of may at 6:30pm'), mk(2007, 5, 31, 18, 30))
  t.equal(nlpDate('11th december 8am'), mk(2006, 12, 11, 8))
  // t.equal(nlpDate('2009 May 22nd'), mk(2009, 05, 22, 12))
  t.equal(nlpDate('22 February'), mk(2007, 2, 22, 12))
  t.equal(nlpDate('22 feb'), mk(2007, 2, 22, 12))
  t.equal(nlpDate('22-feb'), mk(2007, 2, 22, 12))
  t.equal(nlpDate('31 of may at 6:30pm'), mk(2007, 5, 31, 18, 30))
  t.equal(nlpDate('11 december 8am'), mk(2006, 12, 11, 8))
  t.equal(nlpDate('5:00 pm may 27th'), mk(2007, 5, 27, 17))
  t.equal(nlpDate('05:00 pm may 27th'), mk(2007, 5, 27, 17))
  t.equal(nlpDate('5pm on may 27th'), mk(2007, 5, 27, 17))
  // t.equal(nlpDate('5 on may 27th'), mk(2007, 5, 27, 5))
  // t.equal(nlpDate("may '97"), mk(1997, 5, 16, 12))
  // t.equal(nlpDate('may 33'), mk(2033, 5, 16, 12))
  // t.equal(nlpDate('may 32'), mk(2032, 5, 16, 12, 0, 0))
  // t.equal(nlpDate("may '01"), mk(2001, 5, 16, 12, 0, 0))
  t.equal(nlpDate('November 18, 2010'), mk(2010, 11, 18, 12))
  t.equal(nlpDate('Jan 1, 2010'), mk(2010, 1, 1, 12))
  t.equal(nlpDate('February 14, 2004'), mk(2004, 2, 14, 12))
  t.equal(nlpDate('jan 3 2010'), mk(2010, 1, 3, 12))
  t.equal(nlpDate('jan 3 2010 midnight'), mk(2010, 1, 3, 0))
  t.equal(nlpDate('jan 3 2010 at midnight'), mk(2010, 1, 3, 0))
  t.equal(nlpDate('jan 3 2010 at 4'), mk(2010, 1, 3, 4))
  t.equal(nlpDate('may 27, 1979'), mk(1979, 5, 27, 12))
  // t.equal(nlpDate("may 27 '79"), mk(1979, 5, 27, 12))
  // t.equal(nlpDate('may 27 79 4:30'), mk(1979, 5, 27, 16, 30))
  // t.equal(nlpDate('may 27 79 at 4:30'), mk(1979, 5, 27, 4, 30))
  // t.equal(nlpDate('may 27 32'), mk(2032, 5, 27, 12, 0, 0))
  // t.equal(nlpDate('oct 5 2012 1045pm'), mk(2012, 10, 5, 22, 45))
  // t.equal(nlpDate('may 1st 01'), mk(2001, 5, 1, 12))
  t.equal(nlpDate('November 18th 2010'), mk(2010, 11, 18, 12))
  t.equal(nlpDate('November 18th, 2010'), mk(2010, 11, 18, 12))
  t.equal(nlpDate('November 18th 2010 midnight'), mk(2010, 11, 18, 0))
  // t.equal(nlpDate('November 18th 2010 at midnight'), mk(2010, 11, 19, 0))
  t.equal(nlpDate('November 18th 2010 at 4'), mk(2010, 11, 18, 16))
  t.equal(nlpDate('November 18th 2010 at 4'), mk(2010, 11, 18, 4))
  t.equal(nlpDate('March 30th, 1979'), mk(1979, 3, 30, 12))
  // t.equal(nlpDate('March 30th 79'), mk(1979, 3, 30, 12))
  // t.equal(nlpDate('March 30th 79 4:30'), mk(1979, 3, 30, 16, 30))
  // t.equal(nlpDate('March 30th 79 at 4:30'), mk(1979, 3, 30, 4, 30))
  t.equal(nlpDate('22nd February 2012'), mk(2012, 2, 22, 12))
  // t.equal(nlpDate('11th december 79'), mk(1979, 12, 11, 12))
  t.equal(nlpDate('3 jan 2010'), mk(2010, 1, 3, 12))
  t.equal(nlpDate('3 jan 2010 4pm'), mk(2010, 1, 3, 16))
  t.equal(nlpDate('27 Oct 2006 7:30pm'), mk(2006, 10, 27, 19, 30))
  // t.equal(nlpDate('3 jan 10'), mk(2010, 1, 3, 12))
  // t.equal(nlpDate('3 jan 10'), mk(2010, 1, 3, 12))
  // t.equal(nlpDate('3 jan 10'), mk(2010, 1, 3, 12))
  t.equal(nlpDate('5/27/1979'), mk(1979, 5, 27, 12), 'iso-times')
  t.equal(nlpDate('5/27/1979 4am'), mk(1979, 5, 27, 4), 'iso-times')
  // t.equal(nlpDate('7/12/11'), mk(2011, 7, 12, 12), 'iso-times')
  // t.equal(nlpDate('7/12/11'), mk(2011, 12, 7, 12), 'iso-times')
  t.equal(nlpDate('9/19/2011 6:05:57 PM'), mk(2011, 9, 19, 18, 5, 57), 'iso-times')
  t.equal(nlpDate('2013-03-12 17:00'), mk(2013, 3, 12, 17, 0, 0), 'iso-times')
  t.equal(nlpDate('27/5/1979'), mk(1979, 5, 27, 12))
  t.equal(nlpDate('27/5/1979 @ 0700'), mk(1979, 5, 27, 7))
  t.equal(nlpDate('03/18/2012 09:26 pm'), mk(2012, 3, 18, 21, 26))
  // t.equal(nlpDate('30.07.2013 16:34:22'), mk(2013, 7, 30, 16, 34, 22))
  // t.equal(nlpDate('09.08.2013'), mk(2013, 8, 9, 12))
  // t.equal(nlpDate('9.8.2013'), mk(2013, 8, 9, 12))
  t.equal(nlpDate('30-07-2013 21:53:49'), mk(2013, 7, 30, 21, 53, 49), 'iso-short')
  t.equal(nlpDate('2000-1-1'), mk(2000, 1, 1, 12), 'iso-short')
  t.equal(nlpDate('2006-08-20'), mk(2006, 8, 20, 12), 'iso-short')
  t.equal(nlpDate('2006-08-20 7pm'), mk(2006, 8, 20, 19), 'iso-short')
  t.equal(nlpDate('2006-08-20 03:00'), mk(2006, 8, 20, 3), 'iso-short')
  t.equal(nlpDate('2006-08-20 03:30:30'), mk(2006, 8, 20, 3, 30, 30), 'iso-short')
  t.equal(nlpDate('2006-08-20 15:30:30'), mk(2006, 8, 20, 15, 30, 30), 'iso-short')
  t.equal(nlpDate('2006-08-20 15:30.30'), mk(2006, 8, 20, 15, 30, 30), 'iso-short')
  t.equal(nlpDate('1902-08-20'), mk(1902, 8, 20, 12, 0, 0), 'iso-short')
  t.equal(nlpDate('2013.07.30 11:45:23'), mk(2013, 7, 30, 11, 45, 23))
  t.equal(nlpDate('2013.08.09'), mk(2013, 8, 9, 12, 0, 0))

  // t.equal(nlpDate('2012:05:25 22:06:50'), mk(2012, 5, 25, 22, 6, 50))
  // t.equal(nlpDate('05/06'), mk(2007, 5, 6, 12))
  // t.equal(nlpDate('05/06'), mk(2007, 6, 5, 12))
  // t.equal(nlpDate('05/06 6:05:57 PM'), mk(2007, 5, 6, 18, 05, 57))
  // t.equal(nlpDate('05/06 6:05:57 PM'), mk(2007, 6, 5, 18, 05, 57))
  // t.equal(nlpDate('13/09'), mk(2006, 9, 13, 12),'dd/mm')
  // t.equal(nlpDate('1/13'), mk(2007, 1, 13, 12),'dd/mm')
  // t.equal(nlpDate('3/13'), mk(2006, 3, 13, 12),'dd/mm')
  // t.equal(nlpDate('12/1'), mk(2005, 12, 1, 12),'dd/mm')
  // t.equal(nlpDate('12/1'), mk(2006, 12, 1, 12),'dd/mm')
  // t.equal(nlpDate('12/1'), mk(2006, 12, 1, 12),'dd/mm')
  // t.equal(nlpDate('8/1'), mk(2006, 8, 1, 12),'dd/mm')
  // t.equal(nlpDate('8/1'), mk(2007, 8, 1, 12),'dd/mm')
  // t.equal(nlpDate('8/1'), mk(2006, 8, 1, 12),'dd/mm')
  // t.equal(nlpDate('1/1'), mk(2006, 1, 1, 12),'dd/mm')
  // t.equal(nlpDate('1/1'), mk(2007, 1, 1, 12),'dd/mm')
  // t.equal(nlpDate('1/1'), mk(2006, 1, 1, 12),'dd/mm')
  t.equal(nlpDate('2012-06'), mk(2012, 6, 1))
  // t.equal(nlpDate('2013/12'), mk(2013, 12, 1, 0))
  t.end()
})

test('chronic-tests-two', (t) => {
  const nlpDate = function (str) {
    let context = {
      today: [2006, 7, 16],
    }
    let found = nlp(str).dates(context).json()[0] || {}
    found.date = found.date || {}
    return fmt(found.date.start)
  }
  // t.equal(nlpDate('9am on Saturday'), mk(2006, 8, 19, 9))
  t.equal(nlpDate('on Tuesday'), mk(2006, 8, 22, 12))
  t.equal(nlpDate('1:00:00 PM'), mk(2006, 8, 16, 13))
  t.equal(nlpDate('01:00:00 PM'), mk(2006, 8, 16, 13))
  t.equal(nlpDate('today at 02:00:00'), mk(2006, 8, 16, 14))
  t.equal(nlpDate('today at 02:00:00 AM'), mk(2006, 8, 16, 2))
  t.equal(nlpDate('today at 3:00:00'), mk(2006, 8, 16, 3))
  t.equal(nlpDate('today at 03:00:00'), mk(2006, 8, 16, 3))
  // t.equal(nlpDate('tomorrow at 4a.m.'), mk(2006, 8, 17, 4))
  // t.equal(nlpDate('3rd month next year'), mk(2007, 3, 1))
  // t.equal(nlpDate('3rd thursday this september'), mk(2006, 9, 21, 12))
  // t.equal(nlpDate('3rd thursday this november'), mk(2010, 11, 18, 12))
  // t.equal(nlpDate('4th day last week'), mk(2006, 8, 9, 12))
  // t.equal(nlpDate('30-Mar-11'), mk(2011, 3, 30, 12))
  // t.equal(nlpDate('31-Aug-12'), mk(2012, 8, 31))
  // //end of testing handlers
  t.equal(nlpDate('friday'), mk(2006, 8, 18, 12))
  // t.equal(nlpDate('tue'), mk(2006, 8, 22, 12))
  t.equal(nlpDate('13:00'), mk(2006, 8, 16, 13), 'times')
  t.equal(nlpDate('13:45'), mk(2006, 8, 16, 13, 45), 'times')
  t.equal(nlpDate('1:01pm'), mk(2006, 8, 16, 13, 1), 'times')
  t.equal(nlpDate('2:01pm'), mk(2006, 8, 16, 14, 1), 'times')
  t.equal(nlpDate('november'), mk(2006, 11, 1), 'times')
  t.equal(nlpDate('friday 13:00'), mk(2006, 8, 18, 13), 'times')
  t.equal(nlpDate('monday 4:00'), mk(2006, 8, 21, 16), 'times')
  t.equal(nlpDate('sat 4:00'), mk(2006, 8, 19, 4), 'times')
  t.equal(nlpDate('sunday 4:20'), mk(2006, 8, 20, 4, 20), 'times')
  t.equal(nlpDate('4 pm'), mk(2006, 8, 16, 16), 'times')
  t.equal(nlpDate('4 am'), mk(2006, 8, 16, 4), 'times')
  t.equal(nlpDate('12 pm'), mk(2006, 8, 16, 12), 'times')
  t.equal(nlpDate('12:01 pm'), mk(2006, 8, 16, 12, 1), 'times')
  t.equal(nlpDate('12:01 am'), mk(2006, 8, 16, 0, 1), 'times')
  t.equal(nlpDate('12 am'), mk(2006, 8, 16), 'times')
  t.equal(nlpDate('4:00 in the morning'), mk(2006, 8, 16, 4), 'times')
  // t.equal(nlpDate('0:10'), mk(2006, 8, 17, 0, 10),'times')
  t.equal(nlpDate('november 4'), mk(2006, 11, 4, 12))
  t.equal(nlpDate('aug 24'), mk(2006, 8, 24, 12))
  t.equal(nlpDate('friday 1 pm'), mk(2006, 8, 18, 13))
  // t.equal(nlpDate('friday 11 at night'), mk(2006, 8, 18, 23))
  // t.equal(nlpDate('friday 11 in the evening'), mk(2006, 8, 18, 23))
  t.equal(nlpDate('sunday 6am'), mk(2006, 8, 20, 6))
  t.equal(nlpDate('friday evening at 7'), mk(2006, 8, 18, 19))
  // //year
  t.equal(nlpDate('this year'), mk(2006, 1, 1))
  // //month name
  t.equal(nlpDate('last november'), mk(2005, 11, 1))
  // //fortnight
  // t.equal(nlpDate('this fortnight'), mk(2006, 8, 21, 19, 30))
  // t.equal(nlpDate('this fortnight'), mk(2006, 8, 14, 19))
  // //week
  t.equal(nlpDate('this week'), mk(2006, 8, 14))
  // //week
  // t.equal(nlpDate('this weekend'), mk(2006, 8, 20))
  // t.equal(nlpDate('this weekend'), mk(2006, 8, 13))
  // t.equal(nlpDate('last weekend'), mk(2006, 8, 13))
  // //day
  // t.equal(nlpDate('this day'), mk(2006, 8, 16, 19))
  t.equal(nlpDate('today'), mk(2006, 8, 16, 19))
  t.equal(nlpDate('yesterday'), mk(2006, 8, 15, 12))
  t.equal(nlpDate('tomorrow'), mk(2006, 8, 17, 12))
  // //day name
  // t.equal(nlpDate('this tuesday'), mk(2006, 8, 22, 12),'rel-dayname')
  // t.equal(nlpDate('next tuesday'), mk(2006, 8, 22, 12),'rel-dayname')
  // t.equal(nlpDate('last tuesday'), mk(2006, 8, 15, 12),'rel-dayname')
  // t.equal(nlpDate('this wed'), mk(2006, 8, 23, 12),'rel-dayname')
  // t.equal(nlpDate('next wed'), mk(2006, 8, 23, 12),'rel-dayname')
  // t.equal(nlpDate('last wed'), mk(2006, 8, 9, 12),'rel-dayname')
  // //day portion
  // t.equal(nlpDate('this morning'), mk(2006, 8, 16, 9))
  // t.equal(nlpDate('tonight'), mk(2006, 8, 16, 22))
  // //hour
  // t.equal(nlpDate('next hr'), mk(2006, 8, 16, 15, 30, 0))
  // t.equal(nlpDate('next hrs'), mk(2006, 8, 16, 15, 30, 0))
  // //minute
  // t.equal(nlpDate('next min'), mk(2006, 8, 16, 14, 1, 30))
  // t.equal(nlpDate('next mins'), mk(2006, 8, 16, 14, 1, 30))
  // t.equal(nlpDate('next minute'), mk(2006, 8, 16, 14, 1, 30))
  // //second
  // t.equal(nlpDate('next sec'), mk(2006, 8, 16, 14, 0, 1))
  // t.equal(nlpDate('next secs'), mk(2006, 8, 16, 14, 0, 1))
  // t.equal(nlpDate('this second'), mk(2006, 8, 16, 14))
  // t.equal(nlpDate('this second'), mk(2006, 8, 16, 14))
  // t.equal(nlpDate('next second'), mk(2006, 8, 16, 14, 0, 1))
  // t.equal(nlpDate('last second'), mk(2006, 8, 16, 13, 59, 59))
  // t.equal(nlpDate('yesterday at 4:00'), mk(2006, 8, 15, 16))
  t.equal(nlpDate('today at 9:00'), mk(2006, 8, 16, 9))
  // t.equal(nlpDate('today at 2100'), mk(2006, 8, 16, 21))
  // t.equal(nlpDate('this day at 0900'), mk(2006, 8, 16, 9))
  // t.equal(nlpDate('tomorrow at 0900'), mk(2006, 8, 17, 9))
  // t.equal(nlpDate('yesterday at 4:00'), mk(2006, 8, 15, 4))
  // t.equal(nlpDate('last friday at 4:00'), mk(2006, 8, 11, 16))
  // t.equal(nlpDate('next wed 4:00'), mk(2006, 8, 23, 16))
  // t.equal(nlpDate('yesterday afternoon'), mk(2006, 8, 15, 15))
  // t.equal(nlpDate('last week tuesday'), mk(2006, 8, 8, 12))
  t.equal(nlpDate('tonight at 7'), mk(2006, 8, 16, 19))
  // t.equal(nlpDate('tonight 7'), mk(2006, 8, 16, 19))
  // t.equal(nlpDate('7 tonight'), mk(2006, 8, 16, 19))
  t.equal(nlpDate('today at 6:00pm'), mk(2006, 8, 16, 18))
  t.equal(nlpDate('today at 6:00am'), mk(2006, 8, 16, 6))
  // t.equal(nlpDate('this day 1800'), mk(2006, 8, 16, 18))
  t.equal(nlpDate('yesterday at 4:00pm'), mk(2006, 8, 15, 16))
  t.equal(nlpDate('tomorrow evening at 7'), mk(2006, 8, 17, 19))
  t.equal(nlpDate('tomorrow morning at 5:30'), mk(2006, 8, 17, 5, 30))
  // t.equal(nlpDate('next monday at 12:01 am'), mk(2006, 8, 21, 0, 1))
  // t.equal(nlpDate('next monday at 12:01 pm'), mk(2006, 8, 21, 12, 1))
  // //with context
  // t.equal(nlpDate('sunday at 8:15pm'), mk(2006, 8, 13, 20, 15))
  // t.equal(nlpDate('afternoon yesterday'), mk(2006, 8, 15, 15))
  // t.equal(nlpDate('tuesday last week'), mk(2006, 8, 8, 12))
  // t.equal(nlpDate('An hour ago'), mk(2006, 8, 16, 13))
  t.equal(nlpDate('A day ago'), mk(2006, 8, 15, 14))
  t.equal(nlpDate('a month ago'), mk(2006, 7, 16, 14))
  t.equal(nlpDate('a year ago'), mk(2005, 8, 16, 14))
  // //past
  t.equal(nlpDate('3 years ago'), mk(2003, 8, 16, 14), 'ago')
  t.equal(nlpDate('1 month ago'), mk(2006, 7, 16, 14), 'ago')
  // t.equal(nlpDate('1 fortnight ago'), mk(2006, 8, 2, 14),'ago')
  // t.equal(nlpDate('2 fortnights ago'), mk(2006, 7, 19, 14),'ago')
  t.equal(nlpDate('3 weeks ago'), mk(2006, 7, 26, 14), 'ago')
  // t.equal(nlpDate('2 weekends ago'), mk(2006, 8, 5), 'ago')
  t.equal(nlpDate('3 days ago'), mk(2006, 8, 13, 14), 'ago')
  // t.equal(nlpDate('5 mornings ago'), mk(2006, 8, 12, 9),'ago')
  // t.equal(nlpDate('7 hours ago'), mk(2006, 8, 16, 7), 'ago')
  // t.equal(nlpDate('3 minutes ago'), mk(2006, 8, 16, 13, 57), 'ago')
  // t.equal(nlpDate('20 seconds before now'), mk(2006, 8, 16, 13, 59, 40),'ago')
  // //future
  t.equal(nlpDate('3 years from now'), mk(2009, 8, 16, 14, 0, 0))
  // t.equal(nlpDate('6 months hence'), mk(2007, 2, 16, 14))
  // t.equal(nlpDate('3 fortnights hence'), mk(2006, 9, 27, 14))
  t.equal(nlpDate('1 week from now'), mk(2006, 8, 23, 14, 0, 0))
  // t.equal(nlpDate('1 weekend from now'), mk(2006, 8, 19))
  // t.equal(nlpDate('2 weekends from now'), mk(2006, 8, 26))
  // t.equal(nlpDate('1 day hence'), mk(2006, 8, 17, 14))
  // t.equal(nlpDate('5 mornings hence'), mk(2006, 8, 21, 9))
  t.equal(nlpDate('1 hour from now'), mk(2006, 8, 16, 15))
  // t.equal(nlpDate('20 minutes hence'), mk(2006, 8, 16, 14, 20))
  t.equal(nlpDate('20 seconds from now'), mk(2006, 8, 16, 14, 0, 20))
  // t.equal(nlpDate('2 months ago'), mk(2007, 1, 7, 23, 30))
  // //Two repeaters
  t.equal(nlpDate('25 minutes and 20 seconds from now'), mk(2006, 8, 16, 14, 25, 20))
  t.equal(nlpDate('24 hours and 20 minutes from now'), mk(2006, 8, 17, 14, 20, 0))
  t.equal(nlpDate('24 hours 20 minutes from now'), mk(2006, 8, 17, 14, 20, 0))
  t.equal(nlpDate('in 3 hours'), mk(2006, 8, 16, 17))
  // //past
  // t.equal(nlpDate('3 years ago tomorrow'), mk(2003, 8, 17, 12))
  // t.equal(nlpDate('3 years ago this friday'), mk(2003, 8, 18, 12))
  // t.equal(nlpDate('3 months ago saturday at 5:00 pm'), mk(2006, 5, 19, 17))
  // t.equal(nlpDate('2 days from this second'), mk(2006, 8, 18, 14))
  // t.equal(nlpDate('7 hours before tomorrow at midnight'), mk(2006, 8, 17, 17))
  // //future
  // t.equal(nlpDate('september 3 years ago'), mk(2003, 9))
  // t.equal(nlpDate('3rd month next year'), mk(2007, 3))
  // t.equal(nlpDate('3rd month next year'), mk(2007, 3, 1))
  // t.equal(nlpDate('3rd thursday this september'), mk(2006, 9, 21, 12))
  // t.equal(nlpDate('3rd thursday this november'), mk(2010, 11, 18, 12))
  // t.equal(nlpDate('4th day last week'), mk(2006, 8, 9, 12))

  // t.equal(nlpDate('this spring'), mk(2007, 3, 20),'year')
  // t.equal(nlpDate('this winter'), mk(2006, 12, 22),'year')
  // t.equal(nlpDate('last spring'), mk(2006, 3, 20),'year')
  // t.equal(nlpDate('last winter'), mk(2005, 12, 22),'year')
  // t.equal(nlpDate('next spring'), mk(2007, 3, 20),'year')
  // t.equal(nlpDate('this quarter'), mk(2006, 7, 1),'year')
  // t.equal(nlpDate('next quarter'), mk(2006, 10, 1),'year')
  // t.equal(nlpDate('last quarter'), mk(2006, 4, 1),'year')
  // t.equal(nlpDate('1 quarter ago'), mk(2006, 4, 1),'year')
  // t.equal(nlpDate('2 quarters ago'), mk(2006, 1, 1),'year')
  // t.equal(nlpDate('1 quarter from now'), mk(2006, 10, 1),'year')
  // t.equal(nlpDate('Q1'), mk(2006, 1, 1),'year')
  // t.equal(nlpDate('first quarter'), mk(2007, 1, 1),'year')
  // t.equal(nlpDate('1st quarter'), mk(2006, 1, 1),'year')
  // t.equal(nlpDate('q1 2005'), mk(2005, 1, 1),'year')
  // t.equal(nlpDate('2005 q1'), mk(2005, 1, 1),'year')
  // t.equal(nlpDate('q1 this year'), mk(2006, 1, 1),'year')
  // t.equal(nlpDate('this year q1'), mk(2006, 1, 1),'q1')
  // t.equal(nlpDate('q1 next year'), mk(2007, 1, 1),'q1')
  // t.equal(nlpDate('next year q1'), mk(2007, 1, 1),'q1')
  // t.equal(nlpDate('this q1'), mk(2006, 1, 1),'q1')
  // t.equal(nlpDate('last q1'), mk(2006, 1, 1),'q1')
  // t.equal(nlpDate('next q1'), mk(2007, 1, 1),'q1')
  // t.equal(nlpDate('#q2 2005'), mk(2005, 4, 1),'q1')
  // t.equal(nlpDate('2005 q2'), mk(2005, 4, 1),'q1')
  // t.equal(nlpDate('q2 this year'), mk(2006, 4, 1),'q1')
  // t.equal(nlpDate('this year q2'), mk(2006, 4, 1),'q1')
  // t.equal(nlpDate('q2 next year'), mk(2007, 4, 1),'q1')
  // t.equal(nlpDate('next year q2'), mk(2007, 4, 1),'q1')
  // t.equal(nlpDate('this q2'), mk(2006, 4, 1),'q1')
  // t.equal(nlpDate('last q2'), mk(2006, 4, 1),'q1')
  // t.equal(nlpDate('next q2'), mk(2007, 4, 1),'q1')
  t.equal(nlpDate('Q4'), mk(2006, 10, 1), 'q4 #1')
  t.equal(nlpDate('fourth quarter'), mk(2006, 10, 1), 'q4 #2')
  // t.equal(nlpDate('4th quarter'), mk(2005, 10, 1), 'q4')
  t.equal(nlpDate('4th quarter 2005'), mk(2005, 10, 1), 'q4 #3')
  // t.equal(nlpDate('2005 4th quarter'), mk(2005, 10, 1), 'q4')
  // t.equal(nlpDate('4th quarter this year'), mk(2006, 10, 1), 'q4')
  // t.equal(nlpDate('this year 4th quarter'), mk(2006, 10, 1), 'q4')
  // t.equal(nlpDate('4th quarter next year'), mk(2007, 10, 1), 'q4')
  // t.equal(nlpDate('next year 4th quarter'), mk(2007, 10, 1), 'q4')
  // t.equal(nlpDate('this 4th quarter'), mk(2006, 10, 1), 'q4')
  // t.equal(nlpDate('last 4th quarter'), mk(2005, 10, 1), 'q4')
  // t.equal(nlpDate('next 4th quarter'), mk(2006, 10, 1), 'q4')
  // t.equal(nlpDate('1st thursday in november'), mk(2007, 11, 1, 12), 'thurs tests')
  // t.equal(nlpDate('1st friday in november'), mk(2007, 11, 2, 12), 'thurs tests')
  // t.equal(nlpDate('1st saturday in november'), mk(2007, 11, 3, 12), 'thurs tests')
  t.equal(nlpDate('2011-01-01 at noon'), mk(2011, 1, 1, 12, 0), 'thurs tests')
  t.equal(nlpDate('Thu Aug 10'), mk(2006, 8, 10, 12), 'thurs tests')
  // t.equal(nlpDate('Thursday July 31'), mk(2006, 7, 31, 12), 'thurs tests')//?
  t.equal(nlpDate('Thursday December 31'), mk(2006, 12, 31, 12), 'thurs tests')
  t.equal(nlpDate('Thu Aug 10 4pm'), mk(2006, 8, 10, 16), 'thurs tests')
  t.equal(nlpDate('Thu Aug 10 at 4pm'), mk(2006, 8, 10, 16), 'thurs tests')
  t.equal(nlpDate('Thu Aug 10th at 4pm'), mk(2006, 8, 10, 16), 'thurs tests')
  // t.equal(nlpDate('Thu 17th at 4pm'), mk(2006, 8, 17, 16), 'thurs tests')
  // t.equal(nlpDate('Thu 16th at 4pm'), mk(2006, 8, 16, 16), 'thurs tests')
  // t.equal(nlpDate('Thu 1st at 4pm'), mk(2006, 9, 1, 16), 'thurs tests')
  // t.equal(nlpDate('Thu 17th'), mk(2006, 8, 17, 12), 'thurs tests')
  t.equal(nlpDate('Thu Aug 10 2006'), mk(2006, 8, 10, 12), 'thurs tests')
  t.equal(nlpDate('Thursday July 31 2006'), mk(2006, 7, 31, 12), 'thurs tests')
  t.equal(nlpDate('Thursday December 31 2006'), mk(2006, 12, 31, 12), 'thurs tests')
  t.equal(nlpDate('Thursday December 30 2006'), mk(2006, 12, 30, 12), 'thurs tests')
  t.equal(nlpDate('Thu Aug 10th'), mk(2006, 8, 10, 12), 'thurs tests')
  // t.equal(nlpDate('Thursday July 31st'), mk(2006, 7, 31, 12), 'thurs tests')
  t.equal(nlpDate('Thursday December 31st'), mk(2006, 12, 31, 12), 'thurs tests')
  t.equal(nlpDate('Thu Aug 10th 2005'), mk(2005, 8, 10, 12), 'thurs tests')
  t.equal(nlpDate('Thursday July 31st 2005'), mk(2005, 7, 31, 12), 'thurs tests')
  t.equal(nlpDate('Thursday December 31st 2005'), mk(2005, 12, 31, 12), 'thurs tests')
  t.equal(nlpDate('Thursday December 30th 2005'), mk(2005, 12, 30, 12), 'thurs tests')
  t.end()
})
