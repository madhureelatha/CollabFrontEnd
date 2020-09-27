import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class MultiseriesChart extends Component {	
	render() {
		const options = {
				animationEnabled: true,	
				title:{
					text: "Number of New Customers"
				},
				axisY : {
					title: "Number of Customers",
					includeZero: false
				},
				toolTip: {
					shared: true
				},
				data: [{
					type: "spline",
					name: "2016",
					showInLegend: true,
					dataPoints: [
						{ y: 155, label: "Jan" },
						{ y: 150, label: "Feb" },
						{ y: 152, label: "Mar" },
						{ y: 148, label: "Apr" },
						{ y: 142, label: "May" },
						{ y: 150, label: "Jun" },
						{ y: 146, label: "Jul" },
						{ y: 149, label: "Aug" },
						{ y: 153, label: "Sept" },
						{ y: 158, label: "Oct" },
						{ y: 154, label: "Nov" },
						{ y: 150, label: "Dec" }
					]
				},
				{
					type: "spline",
					name: "2017",
					showInLegend: true,
					dataPoints: [
						{ y: 172, label: "Jan" },
						{ y: 173, label: "Feb" },
						{ y: 175, label: "Mar" },
						{ y: 172, label: "Apr" },
						{ y: 162, label: "May" },
						{ y: 165, label: "Jun" },
						{ y: 172, label: "Jul" },
						{ y: 168, label: "Aug" },
						{ y: 175, label: "Sept" },
						{ y: 170, label: "Oct" },
						{ y: 165, label: "Nov" },
						{ y: 169, label: "Dec" }
					]
				},{
					type: "spline",
					name: "2018",
					showInLegend: true,
					dataPoints: [
						{ y: 162, label: "Jan" },
						{ y: 183, label: "Feb" },
						{ y: 115, label: "Mar" },
						{ y: 162, label: "Apr" },
						{ y: 172, label: "May" },
						{ y: 195, label: "Jun" },
						{ y: 132, label: "Jul" },
						{ y: 158, label: "Aug" },
						{ y: 165, label: "Sept" },
						{ y: 180, label: "Oct" },
						{ y: 125, label: "Nov" },
						{ y: 149, label: "Dec" }
					]
				},{
					type: "spline",
					name: "2013",
					showInLegend: true,
					dataPoints: [
						{ y: 112, label: "Jan" },
						{ y: 143, label: "Feb" },
						{ y: 115, label: "Mar" },
						{ y: 152, label: "Apr" },
						{ y: 162, label: "May" },
						{ y: 175, label: "Jun" },
						{ y: 182, label: "Jul" },
						{ y: 198, label: "Aug" },
						{ y: 145, label: "Sept" },
						{ y: 120, label: "Oct" },
						{ y: 185, label: "Nov" },
						{ y: 109, label: "Dec" }
					]
				},{
					type: "spline",
					name: "2019",
					showInLegend: true,
					dataPoints: [
						{ y: 152, label: "Jan" },
						{ y: 123, label: "Feb" },
						{ y: 145, label: "Mar" },
						{ y: 122, label: "Apr" },
						{ y: 192, label: "May" },
						{ y: 145, label: "Jun" },
						{ y: 122, label: "Jul" },
						{ y: 158, label: "Aug" },
						{ y: 175, label: "Sept" },
						{ y: 170, label: "Oct" },
						{ y: 125, label: "Nov" },
						{ y: 159, label: "Dec" }
					]
				},{
					type: "spline",
					name: "2011",
					showInLegend: true,
					dataPoints: [
						{ y: 112, label: "Jan" },
						{ y: 123, label: "Feb" },
						{ y: 135, label: "Mar" },
						{ y: 142, label: "Apr" },
						{ y: 152, label: "May" },
						{ y: 165, label: "Jun" },
						{ y: 122, label: "Jul" },
						{ y: 148, label: "Aug" },
						{ y: 115, label: "Sept" },
						{ y: 150, label: "Oct" },
						{ y: 175, label: "Nov" },
						{ y: 149, label: "Dec" }
					]
				}
			]

		}
		
		return (
		<div>
			<h1>React Multiseries Chart</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default MultiseriesChart;