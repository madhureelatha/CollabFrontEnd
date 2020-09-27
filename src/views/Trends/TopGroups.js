import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import CanvasJSReact from '../../assets/canvasjs.react';
import Select from 'react-dropdown-select';
import { GET_MEMBER_COUNT_PER_CITY, GET_ALL_CITIES } from '../../constants/api'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class TopGroups extends Component {
    constructor() {
        super();
        this.state = {
            locations:[],
            memberPerCityStats: [],
            currentLocation:{}
        };
    }
    componentDidMount() {
        let arr = [];
        let initialLoc=[];
        let finalLoc = [];
        // fetch(GET_ALL_CITIES)
        //     .then(response => {
        //         return response.json();
        //     }).then(data => {
        //         // debugger;
        //         console.log(data);
        //         initialLoc = data.map((loc) => {
        //             return loc;
        //         });

        //         for (var i = 0; i < initialLoc.length; i++) {
        //             finalLoc.push({ value: initialLoc[i].city_id, label: initialLoc[i].city+"("+initialLoc[i].state.toUpperCase()+"-"+initialLoc[i].country.toUpperCase()+"-"+initialLoc[i].zip+")" })
        //         }
        //         console.log(finalLoc);
        //         this.setState({
        //             locations: finalLoc,
        //             memberPerCityStats:[],
        //             currentLocation: finalLoc[0],
        //         });
        //         this.fetchMembersPerCity(finalLoc[0],false);
        //     });
    }
    fetchMembersPerCity(loc,changeCurrent) {
        let tempMembersPerCity;
        let finalMemberPerCity=[];
    //     fetch(GET_MEMBER_COUNT_PER_CITY+"?location="+loc.value, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         // body: JSON.stringify(body)
    //     }).then(response => {
    //         return response.json();
    //     }).then(data=>{
    //         console.log(data);
    //         tempMembersPerCity=data.map((grp)=>{return grp;})
    //     let uniqueYearStats= [...new Set(tempMembersPerCity.map((x=>x.year)))];
    //     let graphData=[];
    //     let prevValue=0;
    //     let currentIndex=-1;
    //     for(var i=0;i<tempMembersPerCity.length;i++){
    //         if(prevValue!=tempMembersPerCity[i].year){
    //             graphData.push({y:tempMembersPerCity[i].total_member_count,label:tempMembersPerCity[i].year,tooltip_name:tempMembersPerCity[i].topic_name+"-->"+tempMembersPerCity[i].member_count+"</br>"});
    //             currentIndex++;
    //             prevValue=tempMembersPerCity[i].year;
    //         }
    //         else{
    //             graphData[currentIndex].tooltip_name=graphData[currentIndex].tooltip_name+tempMembersPerCity[i].topic_name+"-->"+tempMembersPerCity[i].member_count+"</br>";
    //         }
    //     }
    //     this.setState({
    //         locations: this.state.locations,
    //         memberPerCityStats:graphData,
    //         currentLocation: loc,
    //     });
      
    // });
    }
    render() {
        const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: ""
            },
            toolTip:{
                content:"<span style='\"'color: orange;'\"'>YEAR:{label}</span></br>{tooltip_name}</hr><span style='\"'color: green;'\"'>Total count->{y}</span>"
            },
			axisX: {
				title: "Years",
				reversed: true,
			},
			axisY: {
				title: "Total members in all top 5 topics that year(hover for more details) ",
				labelFormatter: this.addSymbols
			},
			data: [{
				type: "bar",
				// dataPoints: this.state.memberPerCityStats
			}]
		}
        return (
            <div className="ChartWithLogarithmicAxis">
                  <div className="heading-div">
                <h4 className="heading-text"> Members Per City grouped by topics of interest at {this.state.currentLocation.label} </h4>
                </div>
                {/* <Dropdown className= "dropdown-collab" options={this.state.locations} onChange={val=>this.fetchMembersPerCity(val,true)} value={this.state.currentLocation} placeholder="Select an option" /> */}
                <CanvasJSChart options={options} />
                <div className="desqcription-heading">
                <h5 >Description:</h5>
                <div>
                </div>The above graph describes the top three groups which consist of members who joined other groups in the user-specified time range, in each year.
                </div>
                <div className="query-details">
                    <h5>
                        Use cases
                    </h5>
                    <div>
                    This helps users identify the groups that they are likely to be interested in joining
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

export default TopGroups