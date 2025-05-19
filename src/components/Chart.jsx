import React from 'react';
import { LineChart, Line, YAxis } from '@rsuite/charts';

const random = () => Math.floor(Math.random() * 100000);

const data = [
    ["00:00", 24758, 18180, random()],
    ["01:00", 57666, 73289, random()],
    ["02:00", 1743, 1037, random()],
    ["03:00", 60425, 86558, random()],
    ["04:00", 2862, 63701, random()],
    ["05:00", 3631, 55744, random()],
    ["06:00", 83788, 53377, random()],
    ["07:00", 34138, 8063, random()],
    ["08:00", 65635, 87076, random()],
    ["09:00", 40086, 32176, random()],
    ["10:00", 89728, 36250, random()],
    ["11:00", 55000, 64098, random()],
    ["12:00", 67378, 56347, random()],
    ["13:00", 53958, 89845, random()],
    ["14:00", 30590, 1742, random()],
    ["15:00", 59808, 87358, random()],
    ["16:00", 6570, 58156, random()],
    ["17:00", 20861, 48829, random()],
    ["18:00", 64949, 75989, random()],
    ["19:00", 85392, 63148, random()],
    ["20:00", 57778, 60936, random()],
    ["21:00", 27390, 2766, random()],
    ["22:00", 35348, 45691, random()],
    ["23:00", 50878, 8247, random()]
]

const Chart = () => (
  <LineChart data={data} >
    <Line name="Sales" area/>
    <Line name="Visitors" area/>
    <Line name="Products" area/>
  </LineChart>
);

export default Chart;
