import axios from "axios";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";

import MouseTrail from "components/Common/MouseTrail";
import PreLoader from "components/Common/PreLoader";

import Mobile from "./mobile";
import Web from "./web/Index";
import ClickAnimation from "components/Common/ClickAnimation";

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

  const isMobileOS = () => {
    const mobileOs = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /Windows Phone/i,
      /BlackBerry/i,
    ];
    const webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator?.appVersion)[1], 10); // also matches AppleWebKit
    const isGoogle = webkitVer && navigator?.vendor.indexOf('Google') === 0;  // Also true for Opera Mobile and maybe others
    const isAndroid = isGoogle && navigator?.userAgent.indexOf('Android') > 0;  // Careful - Firefox and Windows Mobile also have Android in user agent
    const androidDesktopMode = !isAndroid && isGoogle && (navigator?.platform?.indexOf('Linux a') === 0) && 'ontouchstart' in document?.documentElement;
    return androidDesktopMode || (mobileOs.some((item) => {
        return navigator.userAgent.match(item);
    }));
  }

  const onWindowResize = () => {
    if ((window.innerWidth <= 768)) {// navigator.userAgentData.mobile //to detect is it from mobile or web 
      setMouseTrailState(true);
      return setisMobielView(true);
    } else {
      if (navigator?.userAgentData?.mobile || isMobileOS()) {
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
      console.log("pageleave",e,document.hidden);
      if(document.hidden){
        document.title="Come Back :("
      } else {
        document.title = "Srinivas The Developer Personal Portfolio";
      }
    }
    window.addEventListener('visibilitychange',onPageLeave);
    return ()=> window.removeEventListener('visibilitychange',onPageLeave)
  })

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
