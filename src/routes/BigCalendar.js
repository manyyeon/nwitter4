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

  const [modalIsOpened, setModalIsOpened] = useState({
    date: false,
    schedule: false,
  });
  const [selectedSchedule, setSelectedSchedule] = useState({
    id: 0,
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });
  const [scheduleTitle, setScheduleTitle] = useState("");
  const [scheduleDate, setScheduleDate] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
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
      allDay: false,
      start: moment(scheduleDate.startDate.concat(" ", scheduleDate.startTime)),
      end: moment(scheduleDate.endDate.concat(" ", scheduleDate.endTime)),
    };
    setEvents([...events, event]);
    // 초기화
    setScheduleDate({ startDate: "", endDate: "", startTime: "", endTime: "" });
    setScheduleTitle("");
    nextId.current += 1;
    // modal 닫아주기
    setModalIsOpened({ ...modalIsOpened, date: false });
  };
  const onDeleteSchedule = () => {
    setEvents(events.filter((event) => event.id != selectedSchedule.id));
  };
  const onChangeSelectedSchedule = (e) => {
    const { name, value } = e.target;
    setSelectedSchedule({
      ...selectedSchedule,
      [name]: value,
    });
  };
  const onModifySelectedSchedule = () => {
    console.log(events);
    setEvents(
      events.map((event) =>
        event.id === selectedSchedule.id
          ? {
              ...event,
              title: selectedSchedule.title,
              start: moment(
                selectedSchedule.startDate.concat(
                  " ",
                  selectedSchedule.startTime
                )
              ),
              end: moment(
                selectedSchedule.endDate.concat(" ", selectedSchedule.endTime)
              ),
            }
          : event
      )
    );
    // 초기화
    setSelectedSchedule({
      id: 0,
      title: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    });
    setModalIsOpened({ ...modalIsOpened, schedule: false });
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
          setModalIsOpened({ ...modalIsOpened, date: true });
          setScheduleDate({
            startDate: moment(e.start).format("YYYY-MM-DD"),
            endDate: moment(e.start).format("YYYY-MM-DD"),
            startTime: moment(e.start).format("HH:mm:SS"),
            endTime: moment(e.start).format("HH:mm:SS"),
          });
        }}
        onDoubleClickEvent={(e) => {
          setModalIsOpened({ ...modalIsOpened, schedule: true });
          setSelectedSchedule({
            ...selectedSchedule,
            id: e.id,
            title: e.title,
            startDate: moment(e.start).format("YYYY-MM-DD"),
            endDate: moment(e.end).format("YYYY-MM-DD"),
            startTime: moment(e.start).format("HH:mm:SS"),
            endTime: moment(e.end).format("HH:mm:SS"),
          });
          console.log("이벤트 객체 ");
          console.log(e);
          console.log("selectedSchedule 출력");
          console.log(selectedSchedule);
        }}
        selectable
      />
      <Modal
        isOpen={modalIsOpened.date}
        onRequestClose={() => {
          setIsClickedPlusButton(false);
          setModalIsOpened({ ...modalIsOpened, date: false });
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
        {moment(scheduleDate.startDate).format("YYYY.MM.DD")}
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
                  value={scheduleDate.startDate}
                  required
                  onChange={(e) => {
                    onChangeDate(e);
                    console.log(scheduleDate);
                  }}
                />
                <input
                  name="startTime"
                  type="time"
                  value={scheduleDate.startTime}
                  required
                  onChange={(e) => {
                    onChangeDate(e);
                    console.log(scheduleDate);
                  }}
                />
              </div>
              <div>
                <span>End</span>
                <input
                  name="endDate"
                  type="date"
                  value={scheduleDate.endDate}
                  onChange={(e) => {
                    onChangeDate(e);
                    console.log(scheduleDate);
                  }}
                  required
                />
                <input
                  name="endTime"
                  type="time"
                  value={scheduleDate.endTime}
                  required
                  onChange={(e) => {
                    onChangeDate(e);
                    console.log(scheduleDate);
                  }}
                />
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
      {/*schedule Modal */}
      <Modal
        isOpen={modalIsOpened.schedule}
        onRequestClose={() =>
          setModalIsOpened({ ...modalIsOpened, schedule: false })
        }
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
        <div>
          <div>{selectedSchedule.title}</div>
        </div>
        <form>
          <input
            name="title"
            type="text"
            placeholder={selectedSchedule.title}
            value={selectedSchedule.title}
            onChange={(e) => {
              onChangeSelectedSchedule(e);
            }}
            required
          />
          <div>
            <span>Start</span>
            <input
              name="startDate"
              type="date"
              value={selectedSchedule.startDate}
              required
              onChange={(e) => {
                onChangeSelectedSchedule(e);
              }}
            />
            <input
              name="startTime"
              type="time"
              value={selectedSchedule.startTime}
              required
              onChange={(e) => {
                onChangeSelectedSchedule(e);
              }}
            />
          </div>
          <div>
            <span>End</span>
            <input
              name="endDate"
              type="date"
              value={selectedSchedule.endDate}
              onChange={(e) => {
                onChangeSelectedSchedule(e);
              }}
              required
            />
            <input
              name="endTime"
              type="time"
              value={selectedSchedule.endTime}
              required
              onChange={(e) => {
                onChangeSelectedSchedule(e);
              }}
            />
          </div>
          <input
            type="submit"
            value="수정"
            onClick={onModifySelectedSchedule}
          />
        </form>
        <FaTrashAlt
          className={cx("Button")}
          onClick={() => {
            onDeleteSchedule();
            setModalIsOpened({ ...modalIsOpened, schedule: false });
          }}
        />
      </Modal>
    </div>
  );
};

export default BigCalendar;
