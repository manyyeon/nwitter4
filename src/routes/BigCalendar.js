import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "./events";
import Modal from "react-modal";

const BigCalendar = () => {
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
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
        onSelectSlot={openModal}
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
          },
        }}
      >
        Modal content
      </Modal>
    </div>
  );
};

export default BigCalendar;
