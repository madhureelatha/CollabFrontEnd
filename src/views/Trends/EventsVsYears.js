import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import CanvasJSReact from '../../assets/canvasjs.react';
import Select from 'react-dropdown-select';
import { GET_MEMBER_COUNT_PER_CITY, GET_ALL_CITIES,GET_EVENT_PERCENTAGES } from '../../constants/api'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class EventsVsYears extends Component {
    constructor() {
        super();
        this.state = {
            datepoints1:[{name:"",total:0}],
            datepoints2: [{name:"",total:0}],
            datapoints3:[{name:"",total:0}]
        };
    }
    componentDidMount() {
        this.fetchMembersPerCity();
    }
    fetchMembersPerCity() {
        // debugger;
        let tempMembersPerCity;
        let tempActiveGroups=[];
        fetch(GET_EVENT_PERCENTAGES, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(body)
        }).then(response => {
            return response.json();
        }).then(data=>{
            console.log(data);
            tempActiveGroups=data.map((grp)=>{return grp;})
            // debugger;
        var test1= tempActiveGroups.filter(x=>x.category_id==2);
        var test2= tempActiveGroups.filter(x=>x.category_id==1);
        let test3= tempActiveGroups.filter(x=>x.category_id==18);
        let dp1=[];
        let dp2=[];
        let dp3=[];
        // debugger;
        test1.forEach(element => {
            dp1.push({y: element.percentage,label:element.event_year,name:element.category_name,total:element.total_cnt,count:element.event_count})
        });
        test2.forEach(element => {
            dp2.push({y: element.percentage,label:element.event_year,name:element.category_name,total:element.total_cnt,count:element.event_count})
        });
        test3.forEach(element => {
            dp3.push({y: element.percentage,label:element.event_year,name:element.category_name,total:element.total_cnt,count:element.event_count})
        });
        this.setState({
            datepoints1: dp1,
            datepoints2:dp2,
            datapoints3:dp3
        });
    });

    }
    render() {
        const options1 = {
			exportEnabled: true,
			animationEnabled: true,
			
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%({count})",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%({count})",
				dataPoints: this.state.datepoints1
			}]
        }
        const options2 = {
			exportEnabled: true,
			animationEnabled: true,
		
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%({count})",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%({count})",
				dataPoints: this.state.datepoints2
			}]
        }
        const options3 = {
			exportEnabled: true,
			animationEnabled: true,
			
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%({count})",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%({count})",
				dataPoints: this.state.datapoints3
			}]
		}
        
        return (
            <div className="ChartWithLogarithmicAxis">
                  <div className="heading-div">
                <h4 className="heading-text"> Events Growth </h4>
                </div>

                {/* <Dropdown className= "dropdown-collab" options={this.state.locations} onChange={val=>this.fetchMembersPerCity(val,true)} value={this.state.currentLocation} placeholder="Select an option" /> */}
                {/* <CanvasJSChart options={options} />
                 */}
                 <div className="heading-div">
                  <h3 className="heading-text"> Event Growth for {this.state.datepoints1[0].name}( Total: {this.state.datepoints1[0].total} )</h3>
                  </div>
                 <CanvasJSChart options = {options1} />
                 <div className="heading-div">
                 <h3 className="heading-text"> Event Growth for {this.state.datepoints2[0].name}( Total: {this.state.datepoints2[0].total} )</h3>
                 </div><CanvasJSChart options = {options2} />
                 <div className="heading-div">
                 
                 <h3 className="heading-text">Event Growth for {this.state.datapoints3[0].name}( Total: {this.state.datapoints3[0].total} )</h3>
                 </div><CanvasJSChart options = {options3} />
                <div className="desqcription-heading">
                <h5 >Description:</h5>
                <div>
                The pie chart describes the total count and percentage of events year wise of active groups for three categories namely Arts & Cultures, 
                Books clubs and Career and Business. 
                </div>
                </div>
                <div className="query-details">
                    <h5>
                      Use cases
                    </h5>
                    <div>
                       <ul>
                    <li>Based on this information, Meetup analyses the data of most popular events and suggest the users for attending the most happening events that engage users.</li>
                    <li>This information also helps the group creators in conducting events that attract users.</li>
                    </ul>
                    </div>
                <h5>Query:</h5>
                <div><i><b>
                "select extract(year from joined) as year,topic_id,topic_name,count(member_id) as member_count,sum(count(member_id)) OVER (PARTITION BY extract(year from joined)) total_member_count
		from member_groups natural join groups natural join groups_topics
		where city_id = "+params["location"]+" and 
			(extract(year from joined),topic_id,topic_name) in (select a.year,a.topic_id,a.topic_name
								 					 from (select extract(year from joined) as year,topic_id,topic_name,count(member_id),
															rank() over (partition by extract(year from joined) order by count(member_id) desc) rank
														   from member_groups natural join groups natural join groups_topics
														   where city_id = "+params["location"]+"
														   group by extract(year from joined),topic_id,topic_name) a
													 where rank&lt;=5)
		group by extract(year from joined),topic_id,topic_name
		order by year"</b></i>
                </div>
                </div> 
            </div>
        );
    }

}

export default EventsVsYears