import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {
        const { uid, name } = getState().auth;
        try {
            const response = await fetchConToken('events', event, 'POST');
            const body = await response.json();

            if (body.ok) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch(eventAddNew(event));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Hubo un error inesperado', 'error');
        }
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try {
            const response = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await response.json();

            if (body.ok) {
                dispatch(eventUpdated(event));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Hubo un error inesperado', 'error');
        }
    }
}


const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartDelete = () => {
    return async (dispatch, getState) => {
        const { id } = getState().calendar.activeEvent;
        try {
            const response = await fetchConToken(`events/${id}`, null, 'DELETE');
            const body = await response.json();

            if (body.ok) {
                dispatch(eventDeleted());
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Hubo un error inesperado', 'error');
        }
    }
}

const eventDeleted = () => ({ type: types.eventDeleted });

export const eventStartLoaded = () => {
    return async (dispatch) => {
        try {
        const response = await fetchConToken('events');
        const body = await response.json();

        const events = prepareEvents(body.eventos);
        console.log(events);
        
        dispatch(eventLoaded(events));
        } catch (error) {
            console.log(error);
        }
      
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});


