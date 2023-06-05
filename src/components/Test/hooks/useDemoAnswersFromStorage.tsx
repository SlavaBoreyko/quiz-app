import { useEffect, useState } from 'react';

export const useDemoAnswersFromStorage = () => {
  const [demoAnswers, setDemoAnswers] = useState<any | undefined>(undefined);
  const localDemoTest = localStorage.getItem('demoTest');
  useEffect(() => {
    if (localDemoTest) {
      const demoTestParsed = JSON.parse(localDemoTest);
      setDemoAnswers(demoTestParsed);
    }
  }, []);

  return demoAnswers;
};
