import React, { useState, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import styles from "../styles/BigCalendar.module.scss";
import classNames from "classnames/bind";
import { BsPlusCircle, BsXCircle } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

const cx = classNames.bind(styles);

const BigCalendar = () => {
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  const [dateModalIsOpened, setDateModalIsOpened] = useState(false);
  const [scheduleModalIsOpened, setScheduleModalIsOpened] = useState(false);
  const [clickedDate, setClickedDate] = useState({
    year: 0,
    month: 0,
    date: 0,
  });
  const [clickedScheduleId, setClickedScheduleId] = useState(0);
  const [scheduleTitle, setScheduleTitle] = useState("");
  const [scheduleDate, setScheduleDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [events, setEvents] = useState([]);
  const [isClickedPlusButton, setIsClickedPlusButton] = useState(false);

  const onChangeTitle = (e) => {
    setScheduleTitle(e.target.value);
  };
  const onChangeDate = (e) => {
    const { name, value } = e.target;
    setScheduleDate({
      ...scheduleDate,
      [name]: value,
    });
  };
  const nextId = useRef(1);
  const onSubmitSchedule = () => {
    const event = {
      id: nextId.current,
      title: scheduleTitle,
      allDay: true,
      start: new Date(scheduleDate.startDate),
      end: new Date(scheduleDate.endDate),
    };
    setEvents([...events, event]);
    // 초기화
    setScheduleDate({ startDate: "", endDate: "" });
    setScheduleTitle("");
    nextId.current += 1;
    // modal 닫아주기
    setDateModalIsOpened(false);
  };
  const onDeleteSchedule = () => {
    setEvents(events.filter((event) => event.id != clickedScheduleId));
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
          setDateModalIsOpened(true);
          setClickedDate({
            year: e.start.getUTCFullYear(),
            month: e.start.getMonth(),
            date: e.start.getDate(),
          });
        }}
        onDoubleClickEvent={(e) => {
          setScheduleModalIsOpened(true);
          setClickedScheduleId(e.id);
        }}
        selectable
      />
      <Modal
        isOpen={dateModalIsOpened}
        onRequestClose={() => {
          setIsClickedPlusButton(false);
          setDateModalIsOpened(false);
        }}
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
        {clickedDate.year}.{clickedDate.month + 1}.{clickedDate.date}
        <div>
          {isClickedPlusButton ? (
            <form>
              <BsXCircle
                className={cx("Button")}
                onClick={() => setIsClickedPlusButton((prev) => !prev)}
              />
              <input
                name="scheduleTitle"
                type="text"
                placeholder="Title"
                value={scheduleTitle}
                onChange={onChangeTitle}
                required
              />
              <div>
                <span>Start</span>
                <input
                  name="startDate"
                  type="date"
                  value={scheduleDate.startDate.fullString}
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
                  value={scheduleDate.endDate.fullString}
                  onChange={onChangeDate}
                  required
                />
                <input name="endTime" type="time" required />
              </div>
              <input type="submit" value="저장" onClick={onSubmitSchedule} />
            </form>
          ) : (
            <BsPlusCircle
              className={cx("Button")}
              onClick={() => setIsClickedPlusButton((prev) => !prev)}
            />
          )}
        </div>
      </Modal>
      <Modal
        isOpen={scheduleModalIsOpened}
        onRequestClose={() => setScheduleModalIsOpened(false)}
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
            left: "500px",
            right: "500px",
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
        <FaTrashAlt className={cx("Button")} onClick={onDeleteSchedule} />
      </Modal>
    </div>
  );
};

export default BigCalendar;
