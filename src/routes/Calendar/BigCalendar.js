import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import styles from "../../styles/BigCalendar.module.scss";
import classNames from "classnames/bind";
import { dbService } from "../../fbase";
import { addDoc, collection } from "firebase/firestore";
import NewSchedule from "./NewSchedule";
import EditSchedule from "./EditSchedule";

const cx = classNames.bind(styles);

const BigCalendar = () => {
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  // 변수들 //
  // event 배열
  const [events, setEvents] = useState([]);

  // modal open 했는지 안했는지 판단
  const [modalIsOpened, setModalIsOpened] = useState({
    date: false,
    schedule: false,
  });

  // 스케줄
  const [schedule, setSchedule] = useState({
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  const initializeSchedule = () => {
    setSchedule({
      title: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    });
  };

  useEffect(() => {
    dbService.collection("schedule").onSnapshot((snapshot) => {
      const events = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        allDay: false,
        start: moment(doc.data().startDate.concat(" ", doc.data().startTime)),
        end: moment(doc.data().endDate.concat(" ", doc.data().endTime)),
      }));
      setEvents(events);
    });
  }, []);

  // 콜백함수들 //
  // schedule의 속성을 설정해줄 때
  const onChangeSchedule = (e) => {
    const { name, value } = e.target;
    setSchedule({
      ...schedule,
      [name]: value,
    });
  };

  // newSchedule을 등록할 때
  const onSubmitNewSchedule = async (e) => {
    e.preventDefault();
    await addDoc(collection(dbService, "schedule"), {
      title: schedule.title,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
    });

    // 초기화
    initializeSchedule();
    // modal 닫아주기
    setModalIsOpened({ ...modalIsOpened, date: false });
  };

  // selectedSchedule을 삭제할 때
  const onDeleteSelectedSchedule = () => {
    dbService.doc(`schedule/${schedule.id}`).delete();
  };

  // selectedSchedule을 수정한 것을 등록할 때
  const onModifySchedule = (e) => {
    e.preventDefault();
    dbService.doc(`schedule/${schedule.id}`).update({
      title: schedule.title,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
    });
    // 초기화
    initializeSchedule();
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
          setSchedule({
            ...schedule,
            title: "",
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
          setSchedule({
            ...schedule,
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
      <NewSchedule
        schedule={schedule}
        onChangeSchedule={onChangeSchedule}
        onSubmitNewSchedule={onSubmitNewSchedule}
        modalIsOpened={modalIsOpened}
        setModalIsOpened={setModalIsOpened}
      />
      <EditSchedule
        schedule={schedule}
        onChangeSchedule={onChangeSchedule}
        onModifySchedule={onModifySchedule}
        onDeleteSelectedSchedule={onDeleteSelectedSchedule}
        modalIsOpened={modalIsOpened}
        setModalIsOpened={setModalIsOpened}
      />
    </div>
  );
};

export default BigCalendar;
