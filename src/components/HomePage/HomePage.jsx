import React from 'react';
import {useSelector} from 'react-redux';



function HomePage() {
  const user = useSelector((store) => store.user);

  return (
    <div className="container">
      <h2>Welcome to the BGA!</h2>
      <p>The Beast Golf Association (BGA) was started in 2019 when a group of friends decided
        to form their own golf league, playing 2-person scramble format to promote a level playing field 
        while promoting comradery and competition amongst the group. The BGA quickly grew as others friends and
        family members joined the weekly rounds of golf and now over 200 different players have played in the BGA.
      </p>
    </div>
  );
}

export default HomePage;