import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragDrop from './components/DragDrop';
import SignalChart from './components/SignalChart';
import { useEffect, useState } from 'react';
import Load from '../../Globals/Loading';
import api from '../../../api';

const CustomizeSignal = () => {
  const [StrategyList, setStrategyList] = useState(null);
  const [MaskList, setMaskList] = useState(null);
  const [signal, setSignal] = useState(null);
  useEffect(() => {
    getStrategyList();
    getMaskList();
  }, []);
  const getStrategyList = async () => {
    const response = await api.getAllStrategy();
    const responseJson = await response.json();
    setStrategyList(responseJson);
  };
  const getMaskList = async () => {
    const response = await api.getAllMask();
    const responseJson = await response.json();
    setMaskList(responseJson);
  };

  if (StrategyList === null || MaskList === null) {
    return <Load />;
  }
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <DragDrop StrategyList={StrategyList} MaskList={MaskList} setSignal={setSignal}/>
      </DndProvider>
      <SignalChart signal={signal}/>
    </>
  );
};

export default CustomizeSignal;
