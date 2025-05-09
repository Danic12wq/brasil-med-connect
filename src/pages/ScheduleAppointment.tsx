
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ScheduleAppointment = () => {
  const { doctorId } = useParams<{ doctorId: string }>();

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Agendar Consulta</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Esta página será implementada em breve para agendamento de consultas com o médico ID: {doctorId}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleAppointment;
