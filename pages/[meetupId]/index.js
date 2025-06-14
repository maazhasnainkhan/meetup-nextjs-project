import Head from "next/head";
import { DUMMY_MEETUPS } from "../../data/dummy-meetups";
import MeetupDetail from "../../components/meetups/MeetupDetail";

export default function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        id={props.meetupData.id}
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
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