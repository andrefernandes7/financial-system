import React, { useEffect, useState } from 'react';
import { IProduct } from '../interface/IProduct';
import Update from '../img/update.png';
import Delete from '../img/delete.png';

interface ITable{
    data: IProduct[];
    setData: React.Dispatch<React.SetStateAction<IProduct[]>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIndexToUpdt: React.Dispatch<React.SetStateAction<number>>
}

export default function Table({data, setData, setOpen, setIndexToUpdt}: ITable){
    const [total, setTotal] = useState<number>(0)

    const remove = (index: number) => {
        setData(e => e.filter((data, i)=>i !== index))
    }

    const update = (index: number) => {
        setOpen(true)
        setIndexToUpdt(index)
    }

    useEffect(()=>{
        let totalValues = 0
        data.map(d =>{
            totalValues += d.value
        })
        setTotal(totalValues)
    },[data])

    return(
        <>
        <table>
            <tr>
                <th>Nome</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Opções</th>
            </tr>
            {data.map((d, i)=>(
                <tr key={i}>
                    <td>{d.name}</td>
                    <td>R$ {d.value}</td>
                    <td>{(d.date.getDate() < 10 ? '0'+d.date.getDate() : d.date.getDate()) +'/'+(d.date.getMonth()+1 < 10 ? '0'+(d.date.getMonth()+1) : d.date.getMonth()+1)+'/'+d.date.getFullYear()}</td>
                    <td className='options'>
                        <a className='tableOption' onClick={()=>update(i)}>
                            <img src={Update} alt="update" />
                        </a>
                        &nbsp;
                        <a className='tableOption' onClick={()=>remove(i)}>
                            <img src={Delete} alt="delete" />
                        </a>
                    </td>
                </tr>
            ))}
        </table>
        <p>Total: {total}</p>
        </>
    )
}