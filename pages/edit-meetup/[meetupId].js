import Head from "next/head";
import { useRouter } from "next/router";
import { DUMMY_MEETUPS } from "../../data/dummy-meetups";
import EditMeetupForm from "../../components/meetups/EditMeetupForm";

export default function EditMeetupPage(props) {
  const router = useRouter();

  async function editMeetupHandler(enteredMeetupData) {
    const response = await fetch(`/api/meetups/${enteredMeetupData.id}`, {
      method: "PUT",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    router.push("/");
  }

  function cancelHandler() {
    router.back();
  }

  if (!props.meetupData) {
    return <div>Meetup not found!</div>;
  }

  return (
    <>
      <Head>
        <title>Edit {props.meetupData.title}</title>
        <meta
          name="description"
          content="Edit your meetup details"
        />
      </Head>
      <EditMeetupForm 
        meetupData={props.meetupData}
        onEditMeetup={editMeetupHandler}
        onCancel={cancelHandler}
      />
    </>
  );
}

export async function getStaticPaths() {
  return {
    fallback: 'blocking',
    paths: DUMMY_MEETUPS.map((meetup) => ({
      params: {
        meetupId: meetup.id,
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const selectedMeetup = DUMMY_MEETUPS.find(meetup => meetup.id === meetupId);

  if (!selectedMeetup) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      meetupData: selectedMeetup,
    },
  };
}