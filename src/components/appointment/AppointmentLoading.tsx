
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AppointmentLoading = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentLoading;
