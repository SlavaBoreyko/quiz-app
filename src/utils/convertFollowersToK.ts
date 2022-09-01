const convertFollowersToK = (nums: number) => {
  if (nums/1000 >= 100) {
    return (nums/1000).toFixed(0);
  } else {
    return (nums/1000).toFixed(1);
  }
};

export default convertFollowersToK;
