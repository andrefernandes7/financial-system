import React, { useEffect, useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import Table from './components/Table';
import { IProduct } from './interface/IProduct';

function App() {
  const [data, setData] = useState<IProduct[]>([]);
  const [open, setOpen] = useState<boolean>(false)
  const [indexToUpdt, setIndexToUpdt] = useState<number>(-1)

  const handleOpenModal = () =>{
    setOpen(true)
    setIndexToUpdt(-1)
  }

  return (
    <>
    <Modal open={open} setOpen={setOpen} data={data} setData={setData} indexToUpdt={indexToUpdt} />
    <div className="container">
      <div className="financialTable">
        <h1 className="title">SISTEMA FINANCEIRO</h1>
        <button className='buttonPrimary' onClick={() =>handleOpenModal()}>+ Adicionar</button>
        {data.length > 0 ? <Table data={data} setData={setData} setOpen={setOpen} setIndexToUpdt={setIndexToUpdt} /> : <p className="noData">Sem gastos</p>}
      </div>
    </div>
    </>
  );
}

export default App;
