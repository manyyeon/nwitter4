import React, { useState } from "react";
import Modal from "react-modal";
import { FaTrashAlt } from "react-icons/fa";
import classNames from "classnames/bind";
import styles from "../../styles/BigCalendar.module.scss";

const cx = classNames.bind(styles);

const EditSchedule = ({
  schedule,
  onChangeSchedule,
  onModifySchedule,
  onDeleteSelectedSchedule,
  modalIsOpened,
  setModalIsOpened,
}) => {
  return (
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
          left: "200px",
          right: "200px",
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
        <div>{schedule.title}</div>
      </div>
      <form onSubmit={(e) => onModifySchedule(e)}>
        <input
          name="title"
          type="text"
          placeholder={schedule.title}
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
        <input type="submit" value="수정" />
      </form>
      <FaTrashAlt
        className={cx("Button")}
        onClick={() => {
          onDeleteSelectedSchedule();
          setModalIsOpened({ ...modalIsOpened, schedule: false });
        }}
      />
    </Modal>
  );
};

export default EditSchedule;
