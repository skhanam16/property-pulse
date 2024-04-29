// import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = ({loading}) => {
    // const {loading, setLoading} = useState(false);
    const override = {
      display: 'block',
      margin: 'auto',
      marginTop: 'calc(50vh - 75px)', // Adjust margin top to center vertically
  };
  return (
    <div>
      <ClipLoader color='3b82f6' loading={loading} cssOverride={override} size={150} />
    </div>
  )
}
export default Spinner;
