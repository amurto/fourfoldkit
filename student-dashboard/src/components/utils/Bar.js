import React from 'react';
import BarChart from 'react-bar-chart';
 
const data = [
  {text: 'ML', value: 400,  }, 
  {text: 'SPCC', value: 300},
  {text: 'SE', value: 100},
  {text: 'DWM', value: 50},
  {text: 'CSS', value: 500},
];
 
const margin = {top: 20, right: 20, bottom: 30, left: 40};
 
const Bar = () => {
  return (
    <div>
            <div style={{width: '100%' }}> 
                <BarChart 
                  width={600}
                  height={500}
                  margin={margin}
                  data={data}
                  color={"blue"}
                  />
            </div>
        </div>
  )
}
 
export default Bar;