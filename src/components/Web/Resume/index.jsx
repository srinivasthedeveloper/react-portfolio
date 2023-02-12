import { useEffect, useRef, useState } from "react";
import useOnScreen from "Utils/useOnScreen";
import styles from "./styles.module.scss";
import resumePdf from "assets/pdf/resume.pdf";
import page1 from "assets/image/resume/1.png";
import page2 from "assets/image/resume/2.png";
import isMobileOS from "Utils/AndroidDesktopViewFinder";

export default function Resume({
    activeNav = "",
    setActiveNav = () => { },
    ...props
}) {
    const resumeRef = useRef();
    const isVisible = useOnScreen(resumeRef);
    const [isMobileDevice,setMobileDevice] = useState(false);

    useEffect(() => {
        if (isVisible && activeNav !== 'Resume') {
            setActiveNav("Resume");
        }
    }, [isVisible])

    useEffect(() => {
        if (activeNav === 'Resume') {
            // resumeRef.current.scrollIntoView();
        }
    }, [activeNav]);

    useEffect(()=>{
        setMobileDevice(isMobileOS());
    },[navigator?.userAgent])



    return (
        <section className={`${styles['container']}`} ref={resumeRef} id={'resume-view'}>
            <span className={`${styles['header']}`}>Resume</span>
            <div className={`${styles['resume-container']}`}>
                {isMobileDevice ? (
                    <>
                        <img
                            src={page1}
                            loading="lazy"
                            alt={"Resume Page 1"}
                            title={"Resume Page 1"}
                        />
                        <img
                            src={page2}
                            loading="lazy"
                            alt={"Resume Page 2"}
                            title={"Resume Page 2"}
                        />
                    </>
                ) : (
                    <iframe
                        className={`${styles['iframe']}`}
                        src={`${resumePdf}#toolbar=0&navpanes=0&scrollbar=0&view=fitH`}
                        title="Srinivas Resume"
                        height="100%"
                        width="100%"
                    />
                )}
            </div>
            <div className={styles['button-container']}>
                <a href={resumePdf}
                    target="_blank" rel="noreferrer"
                    title="download resume"
                    download="Srinivas_K (The Developer) Resume.pdf"
                    className={`${styles['download-btn']}`}
                >Download Resume</a>
            </div>
        </section>
    )
}