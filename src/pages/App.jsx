import axios from "axios";
import { useEffect, useState, useId } from "react";

import ReactGA from "react-ga4";
import * as amplitude from '@amplitude/analytics-browser';

import MouseTrail from "components/Common/MouseTrail";
import PreLoader from "components/Common/PreLoader";

import Mobile from "./mobile";
import Web from "./web/Index";
import ClickAnimation from "components/Common/ClickAnimation";
import isMobileOS from "Utils/AndroidDesktopViewFinder";

ReactGA.initialize([
  {
    trackingId: "G-S07E5C4KTM",
    gaOptions: {
      userId: 'test'
    }, // optional
    gtagOptions: {}, // optional
  }
]);

function App() {
  const [isMobielView, setisMobielView] = useState(false);
  const [isMouseTrailDisabled, setMouseTrailState] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isMobileDevice, setMobileDevice] = useState(false);
  const uniqueUserId = useId();
  const currentTimeStamp = Date?.now();

  const onWindowResize = () => {
    if ((window.innerWidth <= 768)) {// navigator.userAgentData.mobile //to detect is it from mobile or web 
      setMouseTrailState(true);
      return setisMobielView(true);
    } else {
      if (navigator?.userAgentData?.mobile || isMobileDevice) {
        setMouseTrailState(true);
      } else {
        setMouseTrailState(false);
      }
    }
    return setisMobielView(false);
  };

  useEffect(() => {
    onWindowResize();
    // ReactGA.event({
    //   category: 'Tester',
    //   action: 'Webpage loaded test'
    // });
    window.addEventListener("resize", onWindowResize);
    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  useEffect(() => {
    axios.get("/static/js/bundle.js")
      .then(() => {
        setLoaded(true);
      })
      .catch((e) => {
        setLoaded(true)
      })
  }, [])

  useEffect(()=>{

    function onPageLeave(e){
      if(document.hidden){
        document.title="Come Back :("
      } else {
        document.title = "Srinivas The Developer Personal Portfolio";
      }
    }
    window.addEventListener('visibilitychange',onPageLeave);
    return ()=> window.removeEventListener('visibilitychange',onPageLeave)
  })

  useEffect(()=>{
    const isMobileDesktopView = isMobileOS();
    setMobileDevice(isMobileDesktopView);
    setMouseTrailState(isMobileDesktopView);
  },[navigator?.userAgent])

  useEffect(()=>{
    amplitude.init('16954fcd9cd4a8b30ac9fc8826a99244', undefined, { defaultTracking: { sessions: true, pageViews: true, formInteractions: true, fileDownloads: true }});
    amplitude.track('Page Loaded');
  },[])

  return (
    <>
      {isLoaded ? <>
        {isMouseTrailDisabled ? null : <MouseTrail />}
        <ClickAnimation />
        {isMobielView ? <Mobile /> : <Web />}
      </> : <PreLoader />}
    </>
  );
}

export default App;
