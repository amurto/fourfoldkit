import React from "react";
import { Line, Pie } from 'react-chartjs-2';
import './Chart.css';

const PieChart = () => {
  const data = {
    labels: [
      "01/01/2019",
      "02/01/2019",
      "03/01/2019",
      "04/01/2019",
      "05/01/2019",
      "06/01/2019",
      "07/01/2019"
    ],
    //backgroundColor: ['rgba(255,0,0,1)'],
    //lineTension: 1,
    datasets: [
      {
        label: "Students",
        fill: false,
        borderColor: "rgba(255, 0, 0, 0.3)",
        borderWidth: 1,
        pointRadius: 2,
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: "Facilitators",
        fill: false,
        borderColor: "rgba(0, 255, 0, 0.3)",
        borderWidth: 1,
        pointRadius: 2,
        data: [70, 32, 45, 65, 87, 92, 99]
      },
      {
        label: "School Manager",
        fill: false,
        borderColor: "blue",
        borderWidth: 2,
        pointRadius: 2,
        data: [135, 91, 125, 144, 143, 143, 139]
      }
    ]
  };

  var options = {
    legend: {
      position: "right",
      labels: {
        boxWidth: 10
      }
    },
    scales: {
      xAxes: [
        {
          ticks: { display: false }
        }
      ]
    }
  };

const pieData = {
	labels: [
		'Coding',
		'Dance',
		'Drama'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'rgba(255,0,0, 1)',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

  return (
    <React.Fragment>
      <div className="chart-card">
      <Line data={data} options={options} />
    </div>
      <div className="chart-card">
      <Pie data={pieData} options={options} />
    </div>
    </React.Fragment>
  );
}

export default PieChart;