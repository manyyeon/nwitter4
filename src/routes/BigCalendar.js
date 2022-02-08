import React, { useState, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import styles from "../styles/BigCalendar.module.scss";
import classNames from "classnames/bind";
import { BsInputCursor, BsPlusCircle, BsXCircle } from "react-icons/bs";

const cx = classNames.bind(styles);

const BigCalendar = () => {
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState({
    year: "",
    month: "",
    day: "",
  });
  const [inputDate, setInputDate] = useState({
    startDate: "",
    endDate: "",
    start: {
      year: 0,
      month: 0,
      day: 0,
    },
    end: {
      year: 0,
      month: 0,
      day: 0,
    },
  });

  const [events, setEvents] = useState([]);

  const openModal = (e) => {
    setModalDate({
      year: e.start.getUTCFullYear(),
      month: e.start.getMonth(),
      day: e.start.getDate(),
    });
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const onChangeDate = (e) => {
    const { name, value } = e.target;
    setInputDate({
      ...inputDate,
      [name]: value,
    });
    console.log([name].fullString);
    console.log(new Date(name.fullString));
  };
  const [isClicked, setIsClicked] = useState(false);
  const nextId = useRef(1);
  const onClick = () => {
    setIsClicked((prev) => !prev);
    const { year, month, day } = modalDate;
    const event = {
      id: nextId.current,
      title: "New schedule",
      allDay: true,
      start: new Date(year, month, day),
      end: new Date(year, month, day + 1),
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
        {modalDate.year}.{modalDate.month + 1}.{modalDate.day}
        <div>
          {isClicked ? (
            <div>
              <BsXCircle className={cx("Button")} onClick={onClick} />
              <input
                name="scheduleTitle"
                type="text"
                placeholder="Title"
                required
              />
              <div>
                <span>Start</span>
                <input
                  name="startDate"
                  type="date"
                  value={inputDate.startDate.fullString}
                  required
                  onChange={onChangeDate}
                />
                <input name="startTime" type="time" required />
              </div>
              <div>
                <span>End</span>
                <input
                  name="endDate"
                  type="date"
                  value={inputDate.endDate.fullString}
                  required
                  onChange={onChangeDate}
                />
                <input name="endTime" type="time" required />
              </div>
            </div>
          ) : (
            <BsPlusCircle className={cx("Button")} onClick={onClick} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default BigCalendar;
