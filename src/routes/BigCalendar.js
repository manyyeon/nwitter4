import React, { useState, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import styles from "../styles/BigCalendar.module.scss";
import classNames from "classnames/bind";
import { BsPlusCircle } from "react-icons/bs";

const cx = classNames.bind(styles);

const BigCalendar = () => {
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState({
    year: "",
    month: "",
    date: "",
  });

  const [events, setEvents] = useState([]);

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

  const nextId = useRef(1);
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
      <div className={cx("Title")}>Every Day</div>
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
            top: "250px",
            left: "300px",
            right: "300px",
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
        <div onClick={onClick}>
          <BsPlusCircle />
        </div>
      </Modal>
    </div>
  );
};

export default BigCalendar;
