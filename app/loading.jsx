'use client';
import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loading = () => {
    const {loading, setLoading} = useState(false);
    const overRide = {
        dispaly: 'block',
        margin: '100px auto',

    }
  return (
    <div>
      <ClipLoader color='3b82f6' loading={loading} cssOverride={overRide} size={150} />
    </div>
  )
}

export default Loading
