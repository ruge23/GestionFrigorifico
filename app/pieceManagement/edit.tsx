import { useState } from 'react';
import { EditableViewTab } from '../../components/EditableViewTab';
import { cortesDeCarne } from '../../constants';

export default function EditTab() {
  const [modifiedPieces, setModifiedPieces] = useState(cortesDeCarne);

  const handlePiecesChange = (updatedPieces: typeof cortesDeCarne) => {
    console.log('Datos actualizados:', updatedPieces);
    setModifiedPieces(updatedPieces);
  };

  return (
    <EditableViewTab
      pieces={modifiedPieces}
      onPiecesChange={handlePiecesChange}
    />
  );
}