import React from 'react';

import { Button, Cell, Grid } from '../components';

function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full min-h-screen">
      Home
      <Button>Restart Generation</Button>
      <Cell life />
      <Cell />
      <Grid row={10} col={10} />
    </div>
  );
}

export default Home;
