import moment from "moment";


export const prepareEvents = (events = []) => {
  
    return events.map((event) => {
        event.start = moment(event.start).toDate();
        event.end = moment(event.end).toDate();
        return event;
    });
    }