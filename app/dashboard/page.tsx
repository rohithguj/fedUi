"use client"
import React, { useState } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [emotionsData, setEmotionsData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedYearRange, setSelectedYearRange] = useState('fullYear');

  const fetchEmotionsData = async (period) => {
    try {
      let timeRange = '';
      switch(period) {
        case 'today':
          timeRange = 'today';
          break;
        case 'yesterday':
          timeRange = 'yesterday';
          break;
        case 'lastWeek':
          timeRange = 'lastWeek';
          break;
        case 'lastYear':
          timeRange = selectedYearRange === 'fullYear' ? 'lastYearFull' : 'lastYearPartial';
          break;
        case 'lastMonth':
          const lastMonth = new Date();
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          timeRange = lastMonth.toISOString().slice(0, 7); 
          break;
        default:
          throw new Error('Invalid period');
      }
      console.log('Fetching data for period:', timeRange);
      const response = await fetch(`/api/emotions/${timeRange}`);
      if (!response.ok) {
        throw new Error('Failed to fetch emotions data');
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      setEmotionsData(data);
    } catch (error) {
      console.error(error);
      
    }
  };
  

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    fetchEmotionsData(period);
  };

  const handleYearRangeSelect = (range) => {
    setSelectedYearRange(range);
    if (range === 'fullYear') {
      fetchEmotionsData('lastYearFull');
    } else {
      fetchEmotionsData('lastYearPartial');
    }
  };

  

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🌌 Emotions Dashboard 🌌</h1>
      <div style={styles.periodSelection}>
        <h2 style={styles.periodHeading}>Select Time Period:</h2>
        <div style={styles.buttonContainer}>
          <button className="periodButton" style={styles.button} onClick={() => handlePeriodSelect('today')}>Today</button>
          <button className="periodButton" style={styles.button} onClick={() => handlePeriodSelect('yesterday')}>Yesterday</button>
          <button className="periodButton" style={styles.button} onClick={() => handlePeriodSelect('lastWeek')}>Last Week</button>
          <button className="periodButton" style={styles.button} onClick={() => handlePeriodSelect('lastYear')}>Last Year</button>
          <button className="periodButton" style={styles.button} onClick={() => handlePeriodSelect('lastMonth')}>Last Month</button>
        </div>
      </div>
      {selectedPeriod === 'lastYear' && (
        <div style={styles.yearRangeSelection}>
          <h2 style={styles.yearRangeHeading}>Select Year Range:</h2>
          <div style={styles.buttonContainer}>
            <button className={`yearRangeButton ${selectedYearRange === 'fullYear' ? 'selected' : ''}`} style={styles.button} onClick={() => handleYearRangeSelect('fullYear')}>Up to Today</button>
            <button className={`yearRangeButton ${selectedYearRange === 'partialYear' ? 'selected' : ''}`} style={styles.button} onClick={() => handleYearRangeSelect('partialYear')}>Entire Year</button>
          </div>
        </div>
      )}
      {selectedPeriod && (
        <div style={styles.chartContainer}>
          <div style={styles.chart}>
            <h2 style={styles.chartHeading}>{`${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}'s Emotions`}</h2>
            <PieChart width={400} height={400}>
              <Pie dataKey="value" data={emotionsData} nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#03a9f4" label />
              <Tooltip />
            </PieChart>
          </div>
          <div style={styles.chart}>
            <BarChart width={600} height={400} data={emotionsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#f44336" />
            </BarChart>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#121212',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  heading: {
    fontSize: '48px',
    color: '#03a9f4',
    marginBottom: '30px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  periodSelection: {
    marginBottom: '30px',
  },
  periodHeading: {
    fontSize: '24px',
    color: '#03a9f4',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  button: {
    margin: '0 10px',
    padding: '10px 20px',
    borderRadius: '25px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '30px',
  },
  chart: {
    width: '45%',
    padding: '20px',
    backgroundColor: '#212121',
    borderRadius: '20px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    overflow: 'hidden',
  },
  chartHeading: {
    fontSize: '24px',
    color: '#03a9f4',
    marginBottom: '20px',
    textAlign: 'center',
  },
  yearRangeSelection: {
    marginBottom: '30px',
  },
  yearRangeHeading: {
    fontSize: '20px',
    color: '#03a9f4',
  },
  useClient: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    color: '#fff',
    fontSize: '14px',
  },
};

export default Dashboard;
