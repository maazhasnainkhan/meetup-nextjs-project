import { useRouter } from "next/router";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

function MeetupItem(props) {
  const router = useRouter();
  
  function showDetailsHandler() {
    router.push(`/${props.id}`);
  }

  function editHandler() {
    router.push(`/edit-meetup/${props.id}`);
  }

  function deleteHandler() {
    if (window.confirm('Are you sure you want to delete this meetup?')) {
      props.onDelete(props.id);
    }
  }
  
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
          <button onClick={editHandler} className={classes.editButton}>Edit</button>
          <button onClick={deleteHandler} className={classes.deleteButton}>Delete</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;