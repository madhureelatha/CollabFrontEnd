import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import CanvasJSReact from '../../assets/canvasjs.react';
import Select from 'react-dropdown-select';
import { GET_CATEGORIES, ACTIVE_GROUPS_COUNT } from '../../constants/api'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ActiveGroups extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            activeGroupTrends: [],
            currentSelectedCat:{},
            currentCategory:"Arts and Culture"
        };
        this.fetchActiveGroups = this.fetchActiveGroups.bind(this);
        // this.loadArticle = this.loadArticle.bind(this);
    }
    selectedCategory(){
        return this.state.currentCategory;
    }
    componentDidMount() {
        let initialCat = [];
        let finalCat = [];
        fetch(GET_CATEGORIES)
            .then(response => {
                return response.json();
            }).then(data => {
                // debugger;
                console.log(data);
                initialCat = data.map((cat) => {
                    return cat
                });

                for (var i = 0; i < initialCat.length; i++) {
                    finalCat.push({ value: initialCat[i].category_id, label: initialCat[i].category_name })
                }
                console.log(finalCat);
                this.setState({
                    categories: finalCat,
                    currentSelectedCat:finalCat[0],
                    currentCategory: finalCat[0].category_name,
                    currentCategory:"Arts and Culture"
                });
            });
            // debugger;
            this.fetchActiveGroups({value:1},false);
    }
    fetchActiveGroups(cat,changeCurrent) {
        let tempActiveGroups;
        let finalGroups=[];
        fetch(ACTIVE_GROUPS_COUNT+"?category_id="+cat.value, {
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
      
        for(var i=0;i<tempActiveGroups.length;i++){
            finalGroups.push({x:new Date(tempActiveGroups[i].year,0),y:tempActiveGroups[i].group_count,year:tempActiveGroups[i].year});
        }
        // debugger;
        if(changeCurrent){
            this.setState({
                activeGroupTrends: finalGroups,
                currentSelectedCat:cat,
                currentCategory:cat.label
            });
        }
        else{
            this.setState({
                activeGroupTrends: finalGroups,
                currentSelectedCat:this.state.currentSelectedCat,
                currentCategory: this.state.currentCategory
            });
        }
    });
    }
   
    render() {
        const options = {
            animationEnabled: true,
            theme: "light2",       
            axisY: {
                title: "COUNT OF GROUPS",
                logarithmic: true,
                includeZero: false
            },
            toolTip:{
                content:"A total of {y} active groups created for selected category in {year}" ,
            },
            data: [{
                type: "spline",
                showInLegend: true,
                legendText: "count of active groups for each year under selected category",
                dataPoints: this.state.activeGroupTrends
            }]
        }
        return (
            <div className="ChartWithLogarithmicAxis" >
                <div className="heading-div">
                <h3 class="heading-text">Trends on Active groups ({this.selectedCategory()})</h3>
                </div>
                <Dropdown className= "dropdown-collab" options={this.state.categories} onChange={val=>this.fetchActiveGroups(val,true)} value={this.state.currentSelectedCat} placeholder="Select an option" />
                <CanvasJSChart options={options} />
                <div className="description-heading">
                <h5 >Description:</h5>
                <div>
                The above graph displays the active groups under each different group. 
                Also, it depicts the information regarding the count of groups in distinctive years and months.
                </div>
                </div>
                <div className="query-details">
                    <h5>
                        Use cases
                    </h5>
                    <div>
                    This information is mostly helpful for the people who want to join new categories. 
                    They can get the every nook and cranny of each category and their active groups.
                    </div>
                </div>
                <div className="query-details">
                <h5>Query:</h5>
                <div><i><b>
                "select year, count (group_id) as group_count
		from (select extract(year from joined) as year, group_id, count(member_id)
			  from member_groups natural join groups
			  where category_id = "+params["category_id"]+"
			  group by extract(year from joined),group_id
			  having count(member_id) > 50)
		group by year
		order by year"</b></i>
                </div>
                </div> 
               
            </div>
        );
    }
}

export default ActiveGroups;