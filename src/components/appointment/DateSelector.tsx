
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { addDays } from 'date-fns';

interface DateSelectorProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

const DateSelector = ({ selectedDate, setSelectedDate }: DateSelectorProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Selecione uma data</h3>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        disabled={(date) => {
          // Disable past dates, weekends, and dates more than 30 days in the future
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          const maxDate = addDays(now, 30);
          const day = date.getDay();
          return date < now || date > maxDate || day === 0 || day === 6;
        }}
        className="border rounded-md"
      />
    </div>
  );
};

export default DateSelector;
