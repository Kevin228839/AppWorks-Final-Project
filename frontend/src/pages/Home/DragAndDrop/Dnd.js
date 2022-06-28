import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragDrop from './components/DragDrop';

const DND = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DragDrop />
    </DndProvider>
  );
};

export default DND;
