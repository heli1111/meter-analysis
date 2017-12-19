
### Mission Overview:
The modelling team is looking to visualize data from newly acquired smart meters. These meters have geographic information (latitude and longitude) as well as demand associated with each meter. The modelling team wants to be able to select individual meters on a map (Google Maps) and visualize the demand at **every hour**. The modelling would also appreciate it if you could identify when the demand is above the threshold using a threshold line (shown in the mockup) and/or changing the colour of the points that are above the threshold to red.

## Task Description:
- Create a dashboard that plots all meters on a map.
- Upon click of a meter, display aprorpiate chart that visualizes demand
- Show data that exceeds the threshold
- Any extra feature you thing might be useful

### Mission Loadout:
- This repository contains a skeleton HTML file that includes jquery and google maps scripts. It also includes folders for any CSS and JS you may wish to write.
- Mockup of what the modelling team expects the application to look like. Feel free to be creative and go beyond!

### Meter Data:
- URL: https://lilcortexbucket.blob.core.windows.net/public/meters.json

#### Data Format:
Keep in mind that all values are string in the JSON data!
```javascript
{
  "meter_id": 
  {
    "meter_latitude": "XXXXX", 
	  "threshold": "XXX", 
	  "meter_longitude": "XXXXX", 
	  "demand_ts": 
    [{
		  	"timestamp": "2017-10-06 0:00", 
		  	"demand_value": "102.60414" 
		  }, 
      {
		  	"timestamp": "2017-10-06 0:05",
		  	"demand_value": "69.36022"
		  }
   ]
}

```

### Mission Criteria:
- Coding Style & Efficiency
- Problem Approach & Thinking
- Styling & Animation
- Responsiveness
- Creativity

Good Luck!
