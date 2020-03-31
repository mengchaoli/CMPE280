queue()
	// if want to download online data, using the following code
	//.defer(d3.json, "/api/data")
	.defer(d3.csv, "/dashboard_dataset.csv", function (row){
		
		return {
		    confirmed_date: row.confirmed_date,
			patient_state: row.patient_state,
		    current_status: row.current_status,
			age: row.age,
			gender:row.gender
		}})
    .await(makeGraphs);

function makeGraphs(error, Data) {
//Start Transformations
	var dataSet = Data;

	var dateFormat = d3.time.format("%m/%d/%Y");
	dataSet.forEach(function(d) {
		d.confirmed_date = dateFormat.parse(d.confirmed_date);

	});

	//Create a Crossfilter instance
	var ndx = crossfilter(dataSet);

	//Define Dimensions
	var confirmedDate = ndx.dimension(d => d.confirmed_date );
	var state = ndx.dimension(d => d.patient_state);
	var current_status = ndx.dimension(d => d.current_status);
	var ageDimension = ndx.dimension(d =>  d.age );
	var genderDimension = ndx.dimension( d =>  d.gender);



	//Calculate metrics
	var ConfirmByDate = confirmedDate.group(); 
	var projectsByCurrentStatus = current_status.group();
	var projectsByAge = ageDimension.group();
	var projectsByGender = genderDimension.group();
	var stateGroup = state.group();
	var all = ndx.groupAll();


// calculate the Death Toll
	var netTotalDeaths = ndx.groupAll().reduceSum(function(d){
		if (d.current_status === "death"){
			return 1;}
		else {return 0;}});

	//Define threshold values for data
	var minDate = confirmedDate.bottom(1)[0].confirmed_date;
	var maxDate = confirmedDate.top(1)[0].confirmed_date;

// console.log(minDate);
// console.log(maxDate);

    //Charts
	var dateChart = dc.lineChart("#date-chart");
	var ageDistributionChart = dc.rowChart("#age-chart");
	var deathRatioChart = dc.pieChart("#death-ratio");
	var genderChart = dc.rowChart("#gender-chart");
	var totalCases = dc.numberDisplay("#total-cases");
	var deathToll = dc.numberDisplay("#total-death");
	var stateRanking = dc.barChart("#state-ranking");


  selectField = dc.selectMenu('#menuselect')
        .dimension(state)
		.group(stateGroup); 
	// change the format of displayed content of "#menuselect", eliminate the value
	selectField.title(function (d){
		return "State: " + d.key;
	});

       dc.dataCount("#row-selection")
        .dimension(ndx)
        .group(all);


	totalCases
		.formatNumber(d3.format("s"))
		.valueAccessor(function(d){return d; })
		.group(all);

	deathToll
		.formatNumber(d3.format("s"))
		.valueAccessor(function(d){return d; })
		.group(netTotalDeaths);

	dateChart
		//.width(600)
		.height(220)
		.margins({top: 10, right: 50, bottom: 30, left: 50})
		.dimension(confirmedDate)
		.group(ConfirmByDate)
		.renderArea(true)
		.transitionDuration(500)
		.x(d3.time.scale().domain([minDate, maxDate]))
		.elasticY(true)
		.renderHorizontalGridLines(true)
    	.renderVerticalGridLines(true)
		.xAxisLabel("Day")
		.yAxis().ticks(12);



	genderChart
		//.width(300)
		.height(220)
        .dimension(genderDimension)
        .group(projectsByGender)
        .xAxis().ticks(4);

	ageDistributionChart
		//.width(300)
		.height(220)
        .dimension(ageDimension)
        .group(projectsByAge)
        .xAxis().ticks(4);


	  deathRatioChart
		.height(220)
		//.width(350)
		.radius(90)
		.innerRadius(40)
		.transitionDuration(1000)
		.dimension(current_status)
		.group(projectsByCurrentStatus);


    stateRanking
    	//.width(800)
        .height(220)
        .transitionDuration(1000)
        .dimension(state)
        .group(stateGroup)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .centerBar(false)
        .gap(5)
        .elasticY(true)
        .x(d3.scale.ordinal().domain(state))
        .xUnits(dc.units.ordinal)
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .ordering(function(d){return d.value;})
        .yAxis().tickFormat(d3.format("s"));



    dc.renderAll();

};