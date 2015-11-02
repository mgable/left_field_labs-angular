angular.module('leftfieldlabsApp').constant("CONFIG", {
	protocal: "https",
	domain: "maps.googleapis.com/maps/api/geocode/",
	format: "json",
	apiKey: "AIzaSyBy3Nw5AtljyKxGFc36iXjksBq98MpIPv8",
	origin: "1600 Amphitheatre Parkway, Mountain View, CA",
	places: [
		"Times Square, Manhattan, NY 10036",
		"13000 S Dakota 244, Keystone, SD 57751",
		"1600 Pennsylvania Ave NW, Washington, DC 20500",
		"Golden Gate Bridge, San Francisco, CA 94129",
		"Stonehenge, A344, Amesbury, Wiltshire SP4 7DE, United Kingdom",
		"Great Wall of China",
		"Hollywood Sign, Los Angeles, CA"
	],
	radius: {selected: "imperial", metric: {"label": "KM", "distance": 6371}, imperial: {"label": "miles", "distance": 3959}}
});