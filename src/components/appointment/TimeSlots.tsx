
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

interface TimeSlotsProps {
  selectedTime: string;
  onSelectTime: (time: string) => void;
  availableTimes: Array<{ start: string; end: string }>;
}

const TimeSlots = ({ selectedTime, onSelectTime, availableTimes }: TimeSlotsProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Selecione um horário</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {availableTimes.map((time) => (
          <Button
            key={time.start}
            variant={selectedTime === `${time.start}-${time.end}` ? "default" : "outline"}
            className="justify-start"
            onClick={() => onSelectTime(`${time.start}-${time.end}`)}
          >
            <Clock className="mr-2 h-4 w-4" />
            {time.start}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlots;
