import React, { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import { IProduct } from '../interface/IProduct';
import Close from '../img/close.svg'

interface IModal{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: IProduct[];
    setData: React.Dispatch<React.SetStateAction<IProduct[]>>;
    indexToUpdt: number
}

export default function Modal({open, setOpen, data, setData, indexToUpdt}: IModal){
    const [name, setName] = useState<string>('')
    const [value, setValue] = useState<number|undefined>()
    const [date, setDate] = useState<Date>(new Date())

    const addValue = () =>{
        let newData:IProduct = {name:name, value: value ? value : 0, date: date ? date : new Date()}
       if(indexToUpdt > -1){
        let updtData = data
        updtData[indexToUpdt] = newData
        setData(updtData)
       }else{
        setData([...data, newData])
       }
        setOpen(false)
        setName('')
        setValue(undefined)
        setDate(new Date())
    }

    useEffect(()=>{
        if(indexToUpdt > -1){
            setName(data[indexToUpdt].name)
            setValue(data[indexToUpdt].value)
            setDate(data[indexToUpdt].date)
        }
    },[indexToUpdt])

    return open ? <div className="backModal">
    <div className="modalContainer">
        <form method='post' onSubmit={()=>addValue()}>
            <img src={Close} alt="close" className='closeModal' onClick={()=>setOpen(false)} />
            <div className="formGroup">
                <label htmlFor="name">Nome</label>
                <input
                    type="text"
                    value={name} 
                    onChange={(e)=>setName(e.target.value)}
                    className='inputValue'
                    required
                />
            </div>
            <div className="formGroup">
                <label htmlFor="value">Valor</label>
                <input
                    type="number"
                    value={value} 
                    onChange={(e)=>setValue(e.target.valueAsNumber)}
                    placeholder={'R$'}
                    className='inputValue'
                    step='0.01'
                    min='0'
                    required
                />
            </div>
            <div className="formGroup">
                <label htmlFor="date">Data</label>
                <DatePicker value={date} onChange={setDate} format={"dd/MM/y"} />
            </div>
            <button className="buttonPrimary" type='submit'>Adicionar</button>
        </form>
    </div>
</div> : null
}