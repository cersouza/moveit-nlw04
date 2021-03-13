import Head from 'next/head';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import CountDown from '../components/CountDown';
import styles from '../styles/pages/Challenge.module.css';
import ChallengeBox from '../components/ChallengeBox';
import FooterPage from '../components/FooterPage';
import { useContext, useEffect } from 'react';
import { ChallengeContext } from '../contexts/ChanllengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import { UserContext } from '../contexts/UserContext';
import { useRouter } from 'next/router';

export default function Challenge() {
  const { currentExperience, experienceToNextLevel, level } = useContext(ChallengeContext);
  const { name, username, profileImageUrl } = useContext(UserContext);
  const countDown = useContext(CountdownContext);
  const router = useRouter(); 

  useEffect(() => {   
    if(!username){       
      router.push('/');
    }
  }, []);
  

  return username && (
    <div className={styles.container}>
      <Head>
        { countDown.isActive ? 
          <title>MoveIt | { `${countDown.minutes.toString().padStart(2, '0')}:${countDown.seconds.toString().padStart(2, '0')}` } </title>
        :
          <title>Início | MoveIt</title>
        }
      </Head>

      <ExperienceBar 
        currenteScore={currentExperience}        
        maxScore={experienceToNextLevel}
      />

        <section>
          <div>
            <Profile 
              username={username}
              name={name || username}
              urlAvatar= { profileImageUrl || '../profile-image.jpg' }
              level={level}
            />

            <CompletedChallenges />

            <CountDown
              intialTimeInSeconds={25 * 60}
            />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>  
      <FooterPage />
    </div>
  )
}
