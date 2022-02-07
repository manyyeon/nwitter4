import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Toolbar from "./Toolbar";
import events from "./events";

const BigCalendar = () => {
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      style={{
        height: 500,
        justifyContent: "center",
        marginTop: 70,
        backgroundColor: "white",
      }}
      components={{
        toolbar: Toolbar,
      }}
    />
  );
};

export default BigCalendar;
