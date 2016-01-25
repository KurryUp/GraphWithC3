nypdList = new Mongo.Collection('nypd');

//Resources
//meteor add perak:c3
//meteor add monbro:mongodb-mapreduce-aggregation

if (Meteor.isClient) {
  console.log("Hello client");
  
  Meteor.call("getCity", function(err, result) {
    Session.set('cities', result[0]);
	Session.set('cCount', result[1]);
  });
  
  Template.nypdData.helpers({
    'collision': function(){
	   return Session.get('cities');
    },
    'chart1': function() {
	  /*var i;
	  var cities = [];
	  var cCount = [];
	  var cityText = new String();
	  var cityJSON;
	  
	  cities = Session.get('cities');
	  cCount = Session.get('cCount');
			
	  cityText = '{ "cityData" : [';
	  for(i=0; i<cities.length; i++) {
		  if(i == cities.length-1) {
		    cityText = cityText + '{ "borough":"' + cities[i] + '" , "count":' + cCount[i] + '} ]};';
		  }
		  else {
			cityText = cityText + '{ "borough":"' + cities[i] + '" , "count":' + cCount[i] + '}, ';
		  }		  
	  }

	  console.log(cityText);

	  cityJSON = $.parseJSON(cityText);*/
	  
      return {
        data: {
		  columns: [
			["BROOKLYN", 863],
			["MANHATTAN", 119],
			["QUEENS", 1]
		  ],
		  type : 'pie'
		}
	  }
    }
  });
}

if (Meteor.isServer) {
  console.log("Hello server");
  Meteor.startup(function () {
    // code to run on server at startup
  });
  
  console.log("Methods");
  Meteor.methods({
	getCity:function() {
      console.log("Boroughs");
	  var d1 = nypdList.distinct("borough");
	  var d2 = [];
	  
	  for(var i=0; i<d1.length; i++) {
		d2[i] = nypdList.find({borough:d1[i]}).count();
	  }
	  
	  return [d1, d2]		
	}	
  });
}
