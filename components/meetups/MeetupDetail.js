import { useRouter } from 'next/router';
import classes from './MeetupDetail.module.css';

export default function MeetupDetail(props) {
  const router = useRouter();

  function editHandler() {
    router.push(`/edit-meetup/${props.id}`);
  }

  function deleteHandler() {
    if (window.confirm('Are you sure you want to delete this meetup?')) {
      // Call the delete API
      fetch(`/api/meetups/${props.id}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        router.push('/');
      })
      .catch(error => {
        console.error('Error deleting meetup:', error);
      });
    }
  }

  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
      <div className={classes.actions}>
        <button onClick={editHandler} className={classes.editButton}>
          Edit Meetup
        </button>
        <button onClick={deleteHandler} className={classes.deleteButton}>
          Delete Meetup
        </button>
      </div>
    </section>
  );
}