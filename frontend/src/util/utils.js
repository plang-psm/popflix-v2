import { CircularProgressbar } from 'react-circular-progressbar';

export function extractErrorMessage(error) {
  return error.response?.data?.message || error.message || error.toString();
}

export function ReviewBar(props) {
  return (
    <CircularProgressbar
      className='w-[75px] absolute'
      background={true}
      value={`${Math.ceil((props.vote / 10) * 100)}`}
      text={`${Math.ceil((props.vote / 10) * 100)}%`}
      styles={{
        // Customize the root svg element
        root: {
          bottom: '0',
          padding: '5px',
        },
        // Customize the path, i.e. the "completed progress"
        path: {
          // Path color
          stroke:
            Math.ceil((props.vote / 10) * 100) < 55
              ? `rgba(255, 0, 0, ${Math.ceil((props.vote / 10) * 100) / 100}`
              : Math.ceil((props.vote / 10) * 100) < 75
              ? `rgba(255, 165, 0, ${Math.ceil((props.vote / 10) * 100) / 100}`
              : `rgba(60, 179, 113, ${Math.ceil((props.vote / 10) * 100) / 100}`,
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'butt',
          // Customize transition animation
          transition: 'stroke-dashoffset 0.5s ease 0s',
          // Rotate the path
          transform: 'rotate(0.25turn)',
          transformOrigin: 'center center',
        },
        // Customize the circle behind the path, i.e. the "total progress"
        trail: {
          // Trail color
          stroke: '#d6d6d6',
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'butt',
          // Rotate the trail
          transform: 'rotate(0.25turn)',
          transformOrigin: 'center center',
        },
        // Customize the text
        text: {
          // Text color
          fill: 'white',

          // Text size
          fontSize: '24px',
          transform: 'translate(-23px, 8px)',
        },
        // Customize background - only used when the `background` prop is true
        background: {
          fill: '#000000',
        },
      }}
    />
  );
}

export function SmallerReviewBar(props) {
  return (
    <CircularProgressbar
      className='w-[60px]'
      background={true}
      value={`${Math.ceil((props.vote / 10) * 100)}`}
      text={`${Math.ceil((props.vote / 10) * 100)}%`}
      styles={{
        // Customize the root svg element
        root: {
          bottom: '0',
          padding: '5px',
        },
        // Customize the path, i.e. the "completed progress"
        path: {
          // Path color
          stroke:
            Math.ceil((props.vote / 10) * 100) < 55
              ? `rgba(255, 0, 0, ${Math.ceil((props.vote / 10) * 100) / 100}`
              : Math.ceil((props.vote / 10) * 100) < 75
              ? `rgba(255, 165, 0, ${Math.ceil((props.vote / 10) * 100) / 100}`
              : `rgba(60, 179, 113, ${Math.ceil((props.vote / 10) * 100) / 100}`,
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'butt',
          // Customize transition animation
          transition: 'stroke-dashoffset 0.5s ease 0s',
          // Rotate the path
          transform: 'rotate(0.25turn)',
          transformOrigin: 'center center',
        },
        // Customize the circle behind the path, i.e. the "total progress"
        trail: {
          // Trail color
          stroke: '#d6d6d6',
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'butt',
          // Rotate the trail
          transform: 'rotate(0.25turn)',
          transformOrigin: 'center center',
        },
        // Customize the text
        text: {
          // Text color
          fill: 'white',

          // Text size
          fontSize: '24px',
          transform: 'translate(-23px, 8px)',
        },
        // Customize background - only used when the `background` prop is true
        background: {
          fill: '#000000',
        },
      }}
    />
  );
}
