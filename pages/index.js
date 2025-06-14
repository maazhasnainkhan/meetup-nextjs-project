import Head from "next/head";
import { useState } from "react";
import { DUMMY_MEETUPS } from "../data/dummy-meetups";
import MeetupList from "../components/meetups/MeetupList";

export default function HomePage(props) {
  const [meetups, setMeetups] = useState(props.meetups);

  async function deleteMeetupHandler(meetupId) {
    try {
      const response = await fetch(`/api/meetups/${meetupId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log(data);

      // Remove the meetup from the local state
      setMeetups(prevMeetups => prevMeetups.filter(meetup => meetup.id !== meetupId));
    } catch (error) {
      console.error('Error deleting meetup:', error);
    }
  }

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active meetups!"
        />
      </Head>
      <MeetupList meetups={meetups} onDelete={deleteMeetupHandler} />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 1,
  };
}