import { useState, useEffect } from 'react';
import { useGetObservedsQuery } from '../../../../app/api/common/usersApiSlice';

const AssignObserveds = ({ userId, curObserveds }) => {
  const [selectedObs, setSelectedObs] = useState([]);
  const [observedList, setObservedList] = useState([]);

  const { data: observeds, isError, isFetching, isLoading } = useGetObservedsQuery();

  console.log(observedList);

  useEffect(() => {
    if (observeds) {
      const unLinkedObserveds = observeds.filter(
        (obs) => curObserveds.some((curObs) => curObs.id !== obs.id),
        // eslint-disable-next-line
      );

      setObservedList(unLinkedObserveds);
    }
  }, [curObserveds, observeds]);

  return null;
};

export default AssignObserveds;
