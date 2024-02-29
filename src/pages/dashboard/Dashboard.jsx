import React from 'react'
import AppointmentDashboard from '../../components/appointmentDashboard/AppointmentDashboard'
import LabDashboard from '../../components/labDashboard/LabDashboard'

function Dashboard() {
  return (
    <div>
      <AppointmentDashboard />
      <LabDashboard />
    </div>
  )
}

export default Dashboard