import React, { useEffect, useState } from 'react'
import { Card, Form, Input, Select } from 'antd';
import './Crypto.css'
import { LiaCoinsSolid } from "react-icons/lia";

function Crypto() {
    const apiUrl = 'https://api.coingecko.com/api/v3/exchange_rates/';
    let [data,setData] = useState([]);
    let [inp,Setinp] = useState('1');
    let[firstSelect,setFirstSelect] = useState('Bitcoin');
    let[secondSelect,setSecondSelect] = useState('Ether');
    let [result,setResult] = useState('0');

    useEffect(() => {
        getCoins();
    },[]);

    useEffect(() => {
        if(data.length == 0) return ;


        let firstsel = data.find((item) => {return item.label === firstSelect}).rate
        let Secondsel = data.find((item) => {return item.label === secondSelect}).rate
        const resultData = (inp * Secondsel) / firstsel ;
        setResult(resultData);

    },[data,inp,firstSelect,secondSelect])

    async function getCoins(){
        let response = await fetch(apiUrl);
        let Jsondata = await response.json();

        let res = Object.entries(Jsondata.rates);
        let tempArr = res.map((coin) => {
            return(
                {
                    rate: coin[1].value,
                    value: coin[1].name,
                    label: coin[1].name
                }
            )
        })

        setData(tempArr);
    }

  return (
    <div className='Container'>
        <Card className='cryto-card' title={<h1><LiaCoinsSolid />Crypto Converter</h1>}>
        <Form>
            <Form.Item>
                <Input onChange={(e) => Setinp(e.target.value)}/>
            </Form.Item>
        </Form>
        <div className='select-box'>
        <Select style={{width: '200px'}} defaultValue={'Bitcoin'} options={data} onChange={(value) => setFirstSelect(value)}/>
        <Select style={{width: '200px'}} defaultValue={'Ether'} options={data}  onChange={(value) => setSecondSelect(value)}/>
        </div>
        <p>{`${inp} ${firstSelect} = ${result} ${secondSelect}`}</p>
        </Card>
    </div>

  )
}

export default Crypto