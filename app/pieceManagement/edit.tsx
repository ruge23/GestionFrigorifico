import { useEffect, useState } from 'react';
import { useGlobalSearchParams } from 'expo-router';
import { EditableViewTab } from '../../components/EditableViewTab';
import { cortesDeCarne, cortesDeCerdo, embutidos, otros } from '../../constants';


type PieceType = 'vacuna' | 'porcina' | 'embutidos' | 'otros';

export default function EditTab() {
  const params = useGlobalSearchParams<{ pieces: PieceType }>();
  const [selectPieces, setSelectPieces] = useState(() => {
  switch(params.pieces) {
    case 'vacuna': return cortesDeCarne;
    case 'porcina': return cortesDeCerdo;
    case 'embutidos': return embutidos;
    case 'otros': return otros;
    default: return [];
  }
});          
  const [modifiedPieces, setModifiedPieces] = useState(selectPieces);

  const handlePiecesChange = (updatedPieces: typeof cortesDeCarne) => {
    console.log('Datos actualizados:', updatedPieces);
    setModifiedPieces(updatedPieces);
  };

  useEffect(() => {
    if(params.pieces === 'vacuna') setSelectPieces(cortesDeCarne);
    if(params.pieces === 'porcina') setSelectPieces(cortesDeCerdo);
    if(params.pieces === 'embutidos') setSelectPieces(embutidos);
    if(params.pieces === 'otros') setSelectPieces(otros);
  },[params.pieces]);

  return (
    <EditableViewTab
      pieces={modifiedPieces}
      onPiecesChange={handlePiecesChange}
    />
  );
}          