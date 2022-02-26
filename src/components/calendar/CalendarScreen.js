import React from 'react'
import { Navbar } from '../ui/Navbar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { messages } from '../../helpers/calendar-messages'
import 'moment/locale/es'
import { CalendarEvent } from './CalendarEvent'
moment.locale('es')


const localizer = momentLocalizer(moment); // or globalizeLocalizer

const myEventsList = [
    {
        title: 'Cumpleaños del amigo',
        allDay: true,
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#0073b7',
        notes: 'Comprar la torta',
        user: {
            _id: '123',
            name: 'Juan',
            
        }
    },
];


export const CalendarScreen = () => {

    const eventStyleGetter = (event, start, end, isSelected) => {
        console.log(event); console.log(start); console.log(end); console.log(isSelected);
        const style = {
            backgroundColor: event.bgcolor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    };

    return (
        <div className='calendar-screen'>
            <Navbar />

            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
            />

        </div>

    )
}
