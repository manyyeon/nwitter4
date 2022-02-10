import React, { useState, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import styles from "../../styles/BigCalendar.module.scss";
import classNames from "classnames/bind";
import { BsPlusCircle, BsXCircle } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

const cx = classNames.bind(styles);

const BigCalendar = () => {
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  ///////////////////////////////////////////////////////
  // 변수들
  // event 배열
  const [events, setEvents] = useState([]);

  // modal open 했는지 안했는지 판단
  const [modalIsOpened, setModalIsOpened] = useState({
    date: false,
    schedule: false,
  });

  // 새로 등록하는 스케줄
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });
  // 등록되어 있는 스케줄 선택했을 때
  const [selectedSchedule, setSelectedSchedule] = useState({
    id: 0,
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  // newSchedule 등록하는 modal 안에 있는 plus 버튼이 눌렸는지 안눌렸는지
  const [isClickedPlusButton, setIsClickedPlusButton] = useState(false);

  //////////////////////////////////////////////////////////////////////////////
  // 콜백함수들

  // newSchedule의 속성을 설정해줄 때
  const onChangeNewSchedule = (e) => {
    const { name, value } = e.target;
    setNewSchedule({
      ...newSchedule,
      [name]: value,
    });
  };

  // newSchedule을 등록할 때
  const nextId = useRef(1);
  const onSubmitNewSchedule = () => {
    const event = {
      id: nextId.current,
      title: newSchedule.title,
      allDay: false,
      start: moment(newSchedule.startDate.concat(" ", newSchedule.startTime)),
      end: moment(newSchedule.endDate.concat(" ", newSchedule.endTime)),
    };
    setEvents([...events, event]);
    // 초기화
    setNewSchedule({
      title: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    });
    nextId.current += 1;
    // modal 닫아주기
    setModalIsOpened({ ...modalIsOpened, date: false });
  };

  // selectedSchedule을 삭제할 때
  const onDeleteSelectedSchedule = () => {
    setEvents(events.filter((event) => event.id != selectedSchedule.id));
  };

  // selectedSchedule의 속성을 설정해줄 때
  const onChangeSelectedSchedule = (e) => {
    const { name, value } = e.target;
    setSelectedSchedule({
      ...selectedSchedule,
      [name]: value,
    });
  };

  // selectedSchedule을 수정한 것을 등록할 때
  const onModifySelectedSchedule = () => {
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
    // selectedSchedule 초기화
    setSelectedSchedule({
      id: 0,
      title: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    });
    // modal 닫아주기
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
        // 날짜 칸 클릭했을 때
        onSelectSlot={(e) => {
          // date modal open하는 변수를 true로
          setModalIsOpened({ ...modalIsOpened, date: true });
          // 클릭한 날짜를 newSchedule의 default 값으로 설정
          setNewSchedule({
            ...newSchedule,
            startDate: moment(e.start).format("YYYY-MM-DD"),
            endDate: moment(e.start).format("YYYY-MM-DD"),
            startTime: moment(e.start).format("HH:mm:SS"),
            endTime: moment(e.start).format("HH:mm:SS"),
          });
        }}
        // schedule을 더블클릭 했을 때
        onDoubleClickEvent={(e) => {
          // schedule modal open하는 변수를 true로
          setModalIsOpened({ ...modalIsOpened, schedule: true });
          // selectedSchedule의 정보 설정
          setSelectedSchedule({
            ...selectedSchedule,
            id: e.id,
            title: e.title,
            startDate: moment(e.start).format("YYYY-MM-DD"),
            endDate: moment(e.end).format("YYYY-MM-DD"),
            startTime: moment(e.start).format("HH:mm:SS"),
            endTime: moment(e.end).format("HH:mm:SS"),
          });
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
        {moment(newSchedule.startDate).format("YYYY.MM.DD")}
        <div>
          {isClickedPlusButton ? (
            <form>
              <BsXCircle
                className={cx("Button")}
                onClick={() => setIsClickedPlusButton((prev) => !prev)}
              />
              <input
                name="title"
                type="text"
                placeholder="Title"
                value={newSchedule.title}
                onChange={(e) => {
                  onChangeNewSchedule(e);
                }}
                required
              />
              <div>
                <span>Start</span>
                <input
                  name="startDate"
                  type="date"
                  value={newSchedule.startDate}
                  required
                  onChange={(e) => {
                    onChangeNewSchedule(e);
                  }}
                />
                <input
                  name="startTime"
                  type="time"
                  value={newSchedule.startTime}
                  required
                  onChange={(e) => {
                    onChangeNewSchedule(e);
                  }}
                />
              </div>
              <div>
                <span>End</span>
                <input
                  name="endDate"
                  type="date"
                  value={newSchedule.endDate}
                  onChange={(e) => {
                    onChangeNewSchedule(e);
                  }}
                  required
                />
                <input
                  name="endTime"
                  type="time"
                  value={newSchedule.endTime}
                  required
                  onChange={(e) => {
                    onChangeNewSchedule(e);
                  }}
                />
              </div>
              <input type="submit" value="저장" onClick={onSubmitNewSchedule} />
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
            onDeleteSelectedSchedule();
            setModalIsOpened({ ...modalIsOpened, schedule: false });
          }}
        />
      </Modal>
    </div>
  );
};

export default BigCalendar;
