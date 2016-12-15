//test of the APIs

//lib for sending requests
var request = require("request");

//set base URL
var base_url = "http://localhost:5000/";

//library for JSON requests
requestJSON = require('request-json');
var client = requestJSON.createClient(base_url);


// Test for homepage
describe("Test /", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});

// Test for /showList
describe("Test /showList", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "showList/", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});
 
// Test for /searchStudent
describe("Test /searchStudent", function() {
	//set the data
	var data = {ID: '1'};
	
	//legal request
	it("to returns status code 200", function(done) {
	  client.post(base_url + "searchStudent/", data, function(err, res, body) {
		expect(body).toEqual(
			{
				ID: "1",
				SSN: "AB45", 
				name: "Mattia",
				address: "via Roma",
				mark: "5"
			}
		);

		done();
	  });
	});
	
	//student non existing
	data1 = {ID: "10" };
	it("to returns status code 406", function(done) {
	  client.post(base_url + "searchStudent/", data1, function(err, res, body) {
		expect(res.statusCode).toBe(404);
		done();
	  });
	});
	
	//wrong parameter
	data2 = {name: "1" };
	it("to returns status code 406", function(done) {
	  client.post(base_url + "searchStudent/", data2, function(err, res, body) {
		expect(res.statusCode).toBe(406);
		expect(body).toBe(1);
		done();
	  });
	});


});

describe("test /searchByMark",function(){
    var data = { mark: '>1'};
    it("to returns status code 200 if greater",function(done){
        client.post(base_url+"searchByMark", data,function(err,res,body){
            expect(body).toEqual({
                student :[
                    {
                        ID: "2",
                        SSN: "A6T4",
                        name: "Fabio",
                        address: "via Sommarive",
                        mark: "6"
                    },
                    {
                        ID: "3",
                        SSN: "9IK8",
                        name: "Paolo",
                        address: "via Trento",
                        mark: "7"
                    }
                ]
            }):
        });
    });
    
    var data1 = {mark: '<3'};
    it("to returns status code 200 if less",function(done){
        client.post(base_url+"searchByMark", data1,function(err,res,body){
            expect(body).toEqual({
                student :[
                    {
                        ID: "1",
                        SSN: "AB45", 
                        name: "Mattia",
                        address: "via Roma",
                        mark: "5"
                    },
                    {
                        ID: "2",
                        SSN: "A6T4",
                        name: "Fabio",
                        address: "via Sommarive",
                        mark: "6"
                    }
                ]
            }):
        });
    });
});