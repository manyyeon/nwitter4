import React, { useState } from "react";
import Modal from "react-modal";
import moment from "moment";
import { BsPlusCircle, BsXCircle } from "react-icons/bs";
import classNames from "classnames/bind";
import styles from "../../styles/BigCalendar.module.scss";

const cx = classNames.bind(styles);

const NewSchedule = ({
  schedule,
  onChangeSchedule,
  onSubmitNewSchedule,
  modalIsOpened,
  setModalIsOpened,
}) => {
  // newSchedule 등록하는 modal 안에 있는 plus 버튼이 눌렸는지 안눌렸는지
  const [isClickedPlusButton, setIsClickedPlusButton] = useState(false);
  return (
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
      {moment(schedule.startDate).format("YYYY.MM.DD")}
      <div>
        {isClickedPlusButton ? (
          <form onSubmit={(e) => onSubmitNewSchedule(e)}>
            <BsXCircle
              className={cx("Button")}
              onClick={() => setIsClickedPlusButton((prev) => !prev)}
            />
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={schedule.title}
              onChange={(e) => onChangeSchedule(e)}
              required
            />
            <div>
              <span>Start</span>
              <input
                name="startDate"
                type="date"
                value={schedule.startDate}
                required
                onChange={(e) => onChangeSchedule(e)}
              />
              <input
                name="startTime"
                type="time"
                value={schedule.startTime}
                required
                onChange={(e) => onChangeSchedule(e)}
              />
            </div>
            <div>
              <span>End</span>
              <input
                name="endDate"
                type="date"
                value={schedule.endDate}
                onChange={(e) => onChangeSchedule(e)}
                required
              />
              <input
                name="endTime"
                type="time"
                value={schedule.endTime}
                required
                onChange={(e) => onChangeSchedule(e)}
              />
            </div>
            <input type="submit" value="저장" />
          </form>
        ) : (
          <BsPlusCircle
            className={cx("Button")}
            onClick={() => setIsClickedPlusButton((prev) => !prev)}
          />
        )}
      </div>
    </Modal>
  );
};

export default NewSchedule;
