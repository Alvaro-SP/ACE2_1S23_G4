
import React from "react";

const SVG_WIDTH = 400;
const SVG_HEIGHT = 300;
// RECIBE: ["POMODORO", CUMPLIMIENTO,  PENALIZACION_POR_NO_SENTARSE_A_TIEMPO]
const data = [
    ["lbl1", 100],
    ["lbl2", 12],
    ["lbl3", 100],
    ["etc", 100],
    ["creo", 100],
    ["que", 100],
    ["ta", 12],
    ["weno", 12],
];

export default function ChartPercentPomodoro() {
    const x0 = 50;
    const xAxisLength = SVG_WIDTH - x0 * 2;
    const y0 = 50;
    const yAxisLength = SVG_HEIGHT - y0 * 2;
    const xAxisY = y0 + yAxisLength;
    const dataYMax = 100
    const dataYMin = data.reduce(
        (currMin, [_, dataY]) => Math.min(currMin, dataY),
        Infinity
    );
    const dataYRange = dataYMax - dataYMin;
    const numYTicks = 5;
    const barPlotWidth = xAxisLength / data.length;

    return (
        <div style={{ marginTop: "3%", border: "1px solid black" }}>

        <svg viewBox="20 20 400 320">

            <text x={50} y={325} fontSize="1.3em">
            Porcentaje de Cumplimiento
            </text>

            {/* X axis */}
            <line
            x1={x0}
            y1={xAxisY}
            x2={x0 + xAxisLength}
            y2={xAxisY}
            stroke="grey"
            />
            <text x={x0 + xAxisLength + 5} y={xAxisY + 4}>
            Tiempo
            </text>

            {/* Y axis */}
            <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="grey" />
            {Array.from({ length: numYTicks }).map((_, index) => {
            const y = y0 + index * (yAxisLength / numYTicks);
            const yValue = Math.round(dataYMax - index * (dataYRange / numYTicks));
            return (
                <g key={index}>
                <line x1={x0} y1={y} x2={x0 - 5} y2={y} stroke="grey" />
                <text x={x0 - 5} y={y + 5} textAnchor="end">
                {yValue}
                </text>
                </g>
            );
            })}
            
            <text x={x0} y={y0 - 8} textAnchor="middle">%</text>
            {/* Apple plots */}
            {data.map(([day, dataY], index) => {
            const x = x0 + index * barPlotWidth;

            const yRatio = (dataY - dataYMin) / dataYRange;

            const y = y0 + (1 - yRatio) * yAxisLength;
            const height = yRatio * yAxisLength;

            const applePadding = 2;

            // Calculate the radius of the apple based on the height of the bar
            const appleRadius = 15;

            return (
                <g key={index}>
                <rect
                    x={x + applePadding / 2}
                    y={y}
                    width={barPlotWidth - applePadding}
                    height={height}
                    fill="#866035"
                    title="Porcentaje de Cumplimiento: {}"
                />
                {/* Left apple */}
                <circle
                    cx={x + barPlotWidth / 2}
                    cy={y}
                    r={appleRadius}
                    fill="#F00"
                />

                {/* Apple leaf */}
                <path
                    d={`M${x + barPlotWidth / 2},${y - appleRadius + 3} l5,-10 l-20,0 z`}
                    fill="#0B0c"
                />
                <text x={x + barPlotWidth / 2} y={xAxisY + 16} textAnchor="middle">
                    {day}
                </text>
                </g>
            );
            })}

        </svg>
        </div>
    );
}
