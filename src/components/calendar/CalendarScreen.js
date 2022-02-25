import React from 'react'
import { Navbar } from '../ui/Navbar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'


const localizer = momentLocalizer(moment); // or globalizeLocalizer

const myEventsList = [
    {
        title: 'Cumpleaños de Pedro',
        allDay: true,
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#0073b7',
    },
];


export const CalendarScreen = () => {
    return (
        <div className='calendar-screen'>
            <Navbar />

            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
            />

        </div>

    )
}
