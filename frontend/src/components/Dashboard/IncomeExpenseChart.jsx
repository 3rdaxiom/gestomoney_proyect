// Archivo: src/components/Dashboard/IncomeExpenseChart.jsx
import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const IncomeExpenseChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    // Destruir gráfico anterior si existe
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    // Datos de ejemplo (puedes reemplazar con datos reales del backend)
    const monthlyData = [
      { month: 'Oct', income: 1800, expense: 1200 },
      { month: 'Nov', income: data.monthly_income || 0, expense: data.monthly_expenses || 0 }
    ];

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: monthlyData.map(d => d.month),
        datasets: [
          {
            label: 'Ingresos',
            data: monthlyData.map(d => d.income),
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
          },
          {
            label: 'Gastos',
            data: monthlyData.map(d => d.expense),
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#333'
            },
            ticks: {
              color: 'white'
            }
          },
          x: {
            grid: {
              color: '#333'
            },
            ticks: {
              color: 'white'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Income vs. Expenses</h3>
      <div style={{ position: 'relative', height: '300px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;