
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface NotesFieldProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const NotesField = ({ notes, setNotes }: NotesFieldProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Observações (opcional)</h3>
      <Textarea 
        placeholder="Descreva brevemente o motivo da consulta ou quaisquer sintomas relevantes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        className="w-full"
      />
    </div>
  );
};

export default NotesField;
