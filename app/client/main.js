import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import Highcharts from 'highcharts';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

// Emails = new Mongo.Collection('emails');
// const safeEmails = Emails.find(
// 	{UserGroup: {$ne: 'Test'}}, 
// 	{OpenRate: 1}
// );  
//  {UserGroup: {$ne: 'Test'}, NumberSent: {$ne: 0}} );
// console.log(safeEmails);

// const clEmail = Emails.findOne({SendID: 418602});
// console.log(clEmail);

// Meteor.subscribe('emails', function() {  // emails.public
//   console.log(Emails.find());
// });

// Template.emailsInfo.helpers({
//   figure: function() {
//     return Emails.find(UserGroup: 'Figure');
//   }
// })


Template.graph.onCreated(function bodyOnCreated() {
  // this.state = new ReactiveDict();
  // Meteor.subscribe('emails.public', function() {
  //   console.log(Emails.find());
  // });
});


// what does autorun do?
// Can this graph be rendered three times with just this one code block? 
// TODO:
// display all three graphs + raw data
// switch between them with React state
// Test if changing the data on the backend auto updates the frontend
// Add loading for when data is being accessed
// Bind dates together and display them for last 16 weeks?
// Query past dates 
// Enter custom dates
// Save dates queried in cookie
// Export data


// Reference:
// OpenRate ClickThroughRate UnsubscribeRate UserGroup SentDate
Template.graph.onRendered(function() {
  const chartColors = {
    'Figure': '#FBA414',  // yellow
    'Reason8': '#AE2261', // purple
    'Take': '#3E98AC',    // blue 
    'gray': '#9F9F9F', 
    'black': '#2a2a2a' 
  };
  let Emails = new Mongo.Collection('emails');
  let dateArray;

  // this.autorun(() => {
  //   this.subscribe('emails', renderHighchart);
  // });
  let handle = Meteor.subscribe('emails', renderHighchart.bind(this.$('div')));
  // console.log(emails.find().fetch());




  function renderHighchart(engagementRate = 'OpenRate', startDate = 1441843200000, endDate) {
    let emailData = Emails.find().fetch(), 
        dateArray = [];
    // console.log(Emails.find({}, {fields: {SentDate: 1}} ).fetch());

    function parseData(data, key, maxLength = 6) {
      // make an array from an object
      let arrWrapper = [], 
          // key1 = Object.keys(data[0])[0],
          // key2 = Object.keys(data[0])[1],
          isDate = false;

      // console.log(key1);
      // console.log(key2);
      console.log(data);

      for (var i = 0; i < maxLength; i++) {
        let arr = [ Date.parse(data[i]['SentDate']), data[i][key] ];
          // new Date(
          // ).toISOString()
        arrWrapper.push(arr);
      }
      console.log(key);
      // console.log(arrWrapper);
      return arrWrapper;
    }

    // emailData.forEach(function(el, i) {
    //   if (i < 10) {
    //     dateArray.push(el.SentDate);  // .toDateString()
    //   }
    //   // console.log(el.ClickThroughRate);
    //   // console.log(el.SentDate);
    // });

    // console.log(dateArray.slice(0, 11))
    // console.log(Emails.find({}, {SentDate:1}).aggregate(dayOfYear: {$dayOfYear: '$SentDate'}).fetch());
    // console.log(emailData[0].SentDate.toDateString());
    // console.log(Emails.find({UserGroup: "Reason8"}).fetch().slice(-6, -1));
    console.log(
      parseData(Emails.find({UserGroup: 'Reason8'}, {fields: {OpenRate: 1, ClickThroughRate: 1, UnsubscribeRate: 1, SentDate: 1}}).fetch(), engagementRate, 6) //'OpenRate',
    );
    console.log('I want: ' + Date.UTC(2015, 8, 10));
    // console.log(emailData.aggregate(
    //    [
    //      {
    //        $group:
    //          {
    //            dayOfYear: { $dayOfYear: "$date" }
    //          }
    //      }
    //    ]
    // ))

  	this.highcharts({
  		chart: {
        backgroundColor: 'transparent'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date'
        },
        dateTimeLabelFormats: {
          month: '%e %b'
        }
        // categories: parseData(Emails.find({}, {fields: {SentDate: 1}}).fetch(), 6)
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Rate %'
        }
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        line: {
          animation: false,
          cursor: 'pointer', 
          marker: {
            enabled: false
          }
        }
      },
      series: [
        {
          name: 'Reason 8 users',
          // data: parseData(Emails.find({UserGroup: 'Reason8', SentDate: {$gte: new Date(startDate)}}, {fields: {engagementRate: 1, SentDate: 1}}).fetch(), engagementRate), 
          color: chartColors.Reason8
        }, {
          name: 'Figure users',
          data: parseData(Emails.find({UserGroup: 'Figure'}, {SentDate: {$gte: new Date(startDate)}}, {fields: {OpenRate: 1, ClickThroughRate: 1, UnsubscribeRate: 1, SentDate: 1}}).fetch(), engagementRate), 
          color: chartColors.Figure
        }
      ],
      title: {
        text: null
      }
  	});
  }
});