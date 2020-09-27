import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import CanvasJSReact from '../../assets/canvasjs.react';
import Select from 'react-dropdown-select';
import { GET_WIDELY_SPREAD_GROUPS } from '../../constants/api'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MemberPerCity extends Component {
    constructor() {
        super();
        this.state = {
            years: [],
            widelySpredGroups: [],
            currentYear:{},
            graphData:[]
        };
    }
    componentDidMount() {
        let arr = [];
        for (let i = 2002; i < 2017; i++) {
            arr.push({value:i,label:i});
        }
        this.setState({
            years: arr,
            widelySpredGroups:[],
            currentYear:arr[0],
            graphData:[]
        });
        this.fetchWidelySpreadGroups(arr[0],false)
    }
    fetchWidelySpreadGroups(year,changeCurrent) {
        let tempGroups;
        let finalGroups=[];
        fetch(GET_WIDELY_SPREAD_GROUPS+"?year="+year.value, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(body)
        }).then(response => {
            return response.json();
        }).then(data=>{
            console.log(data);
            let monthArray=["test","JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
            tempGroups=data.map((grp)=>{return grp;})
            let uniqueGroups=[...new Set(tempGroups.map(item => item.group_id))];
            for(var i=0;i<uniqueGroups.length;i++){
                finalGroups[i]=[];
                for(var j=1;j<=12;j++){
                    let reqGroup= tempGroups.filter(x=>x.group_id==uniqueGroups[i]&&x.month1==j)
                    if(reqGroup.length==1){
                        finalGroups[i].push({x:new Date(year.value,j-1),y:reqGroup[0].total_members,name:reqGroup[0].group_name+"(spread at:"+reqGroup[0].city_count+" locs with "+reqGroup[0].member_count+" people)",city_count:reqGroup[0].city_count});
                    }
                    else{
                        finalGroups[i].push({x:new Date(year.value,j-1),y:0,name:tempGroups.filter(x=>x.group_id==uniqueGroups[i])[0].group_name+"(spread at"+tempGroups.filter(x=>x.group_id==uniqueGroups[i])[0].city_count+" locs with "+tempGroups.filter(x=>x.group_id==uniqueGroups[i])[0].member_count+" people)",city_count:0});
                    }
                }
            }
            let finalGraph=[];
            for(i=0;i<finalGroups.length;i++){
                finalGraph.push({
                    type: "spline",
		            name: finalGroups[i][0].name,
		            markerSize: 5,
      	            axisYType: "secondary",
		            xValueFormatString: "YYYY",
		            // yValueFormatString: "#,##0.0\"%\"",
		            showInLegend: true,
		            dataPoints: finalGroups[i]
                });
            }
            this.setState({
                years: this.state.years,
                widelySpredGroups: finalGroups,
                currentYear:year,
                graphData:finalGraph
            })
    });
    }
    render() {
        const options = {
            animationEnabled: true,
	subtitles: [{
		text: "Try Clicking and Hovering over Legends!"
	}],
	axisX: {
		lineColor: "black",
		labelFontColor: "black"
	},
	axisY2: {
      	gridThickness: 0,
		title: "Member Count",
		titleFontColor: "black",
		labelFontColor: "black"
	},
	legend: {
		cursor: "pointer",
		itemmouseover: function(e) {
			e.dataSeries.lineThickness = e.chart.data[e.dataSeriesIndex].lineThickness * 2;
			e.dataSeries.markerSize = e.chart.data[e.dataSeriesIndex].markerSize + 2;
			e.chart.render();
		},
		itemmouseout: function(e) {
			e.dataSeries.lineThickness = e.chart.data[e.dataSeriesIndex].lineThickness / 2;
			e.dataSeries.markerSize = e.chart.data[e.dataSeriesIndex].markerSize - 2;
			e.chart.render();
		},
		itemclick: function (e) {
			if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
				e.dataSeries.visible = false;
			} else {
				e.dataSeries.visible = true;
			}
			e.chart.render();
		}
	},
	toolTip: {
		shared: true
	},
	data:this.state.graphData
    }
        return (
            <div className="ChartWithLogarithmicAxis">
                <div className="heading-div">
                <h3 className="heading-text">Widely spread groups - {this.state.currentYear.value} </h3>
                </div>
                <Dropdown className= "dropdown-collab" options={this.state.years} onChange={val=>this.fetchWidelySpreadGroups(val,true)} value={this.state.currentYear} placeholder="Select an option" />
                <CanvasJSChart options={options} />
                <div className="description-heading">
                <h5 >Description:</h5>
                <div>
                This line chart above describes the top widely spread groups in different locations with member count of each group in different months for corresponding year.
                Users can select the year and can retrieve the information as requested.
                </div>
                </div>
                <div className="query-details">
                    <h5>
                        Use cases
                    </h5>
                    <div>
                        <ul>
                    <li>This information is helpful for the users to know the most popular groups and total count and increase of members in that groups. Due to this, users might join the group and which in fact beneficial for Meetup to expand their organization.</li>
                     <li>In addition to this, Meetup can also record the information and explore the data in and out for building new business strategies.</li>
                    </ul>
                    </div>
                </div>
                <div className="query-details">
                <h5>Query:</h5>
                <div><i><b>
                "SELECT g1.group_id
				,max(group_name) AS group_name
				,count(DISTINCT (mg1.member_id)) AS total_members
				,max(g2.count) AS city_count
				,extract(month FROM mg1.joined) AS month1
			FROM groups g1
			JOIN (
				SELECT g.group_id
					,g.city_id
					,count(m.member_id) member_id_count
					,count(DISTINCT (m.city)) AS count
				FROM groups g
				JOIN member_groups mg ON mg.group_id = g.group_id
				JOIN members m ON m.member_id = mg.member_id
				WHERE mg.joined BETWEEN to_date('1-1-"+params["year"]+"', 'MM-DD-YYYY')
						AND to_date('12-31-"+params["year"]+"', 'MM-DD-YYYY')
				GROUP BY g.group_id
					,g.city_id
				ORDER BY count(DISTINCT (m.city)) DESC
					,count(m.member_id) DESC FETCH first 7 rows ONLY
				) g2 ON g1.group_id = g2.group_id
			JOIN member_groups mg1 ON g1.group_id = mg1.group_id
			WHERE extract(year FROM mg1.joined) = "+params["year"]+"
			GROUP BY g1.group_id
				,extract(month FROM mg1.joined)
			ORDER BY city_count desc,g1.group_id
				,month1"</b></i>
                </div>
                </div> 
            </div>
        );
    }

}

export default MemberPerCity