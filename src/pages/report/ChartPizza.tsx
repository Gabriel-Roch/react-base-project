import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function ChartPizza() {
    // Dados fornecidos no formato JSON
  
    const [jsonData, setJsonData] = useState([])

    useEffect(() => {
        fetch(process.env.REACT_APP_BASE_URL + "/report", {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(result => {
                setJsonData(result)
            })
    }, [])

    // Processar os dados do JSON para preparar para o gráfico
    const processedData = jsonData.reduce((acc, curr) => {
        //@ts-ignore
        const paymentType = curr.fk_p_type_name;
        //@ts-ignore
        const profit = parseFloat(curr.profit);

        if (acc[paymentType]) {
            acc[paymentType] += profit;
        } else {
            acc[paymentType] = profit;
        }

        return acc;
    }, {} as Record<string, number>);

    const seriesData = Object.keys(processedData).map(paymentType => ({
        name: paymentType,
        y: processedData[paymentType]
    }));

    const options: Highcharts.Options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Lucro por Tipo de Pagamento'
        },
        series: [
            {
                name: 'Profit',
                data: seriesData,
                type: 'pie'
            }
        ]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};


