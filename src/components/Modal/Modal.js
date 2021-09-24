import classes from "./Modal.module.css";

const Modal = (props) => {
  console.log(props);
  return (
    <div>
      <div className={classes.backdrop} onClick={props.showAndHideModal} />
      <div className={classes.modal}>{props.children}</div>
    </div>
  );
};

export default Modal;
