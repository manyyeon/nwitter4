import React, { useState, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";

const BigCalendar = () => {
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState({
    year: "",
    month: "",
    date: "",
  });

  const [events, setEvents] = useState([
    {
      id: 0,
      title: "All Day Event very long title",
      allDay: true,
      start: new Date(2022, 1, 0),
      end: new Date(2022, 1, 3),
    },
  ]);

  const openModal = (e) => {
    setModalDate({
      year: e.start.getUTCFullYear(),
      month: e.start.getMonth(),
      date: e.start.getDate(),
    });
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const nextId = useRef(2);
  const onClick = () => {
    const { year, month, date } = modalDate;
    const event = {
      id: nextId.current,
      title: "New schedule",
      allDay: true,
      start: new Date(year, month, date),
      end: new Date(year, month, date + 1),
    };
    setEvents([...events, event]);
    nextId.current += 1;
  };

  return (
    <div>
      <div>Every Day</div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 500,
          justifyContent: "center",
          marginTop: 70,
          backgroundColor: "white",
        }}
        components={{}}
        onSelectSlot={(e) => {
          openModal(e);
        }}
        selectable
      />
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            zIndex: 1050,
          },
          content: {
            position: "absolute",
            top: "100px",
            left: "100px",
            right: "100px",
            bottom: "100px",
            border: "10px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
            fontSize: "80px",
          },
        }}
      >
        {modalDate.year}.{modalDate.month}.{modalDate.date}
        <button onClick={onClick} style={{ fontSize: "50px" }}>
          +
        </button>
      </Modal>
    </div>
  );
};

export default BigCalendar;
