import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next'
import { useInView } from "react-intersection-observer";
import { lightGray } from "../../services/colors";
import { MainHeading1 } from "../../services/globalStyles"
import {
    WhoWeAreSection,
    Waves,
    Main,
    WhoWeAreText,
    Hand,
    CurvedLine,
    Content,
    Rocket,
    Human,
    Text,
    Circle
} from "./WhoWeAreStyles";


const WhoWeAre = () => {
    const { t } = useTranslation()
    const whoWeAre = t('WhoWeAre.text', { returnObjects: true })
    const [indexArr, setIndexArr] = useState(0)

    const initial = { opacity: 0, y: 30 };
    const transition = { delay: 0.3, duration: 0.6 };
    const animation = useAnimation();

    const { ref, inView } = useInView({ threshold: 0.2 });

    useEffect(() => {
        if (inView) {
            animation.start({
                opacity: 1,
                y: 0,
            });
        }
    }, [inView, animation])


    const changeIndexArr = (index) => {
        setIndexArr(index)
    }
    return (
        <WhoWeAreSection id="whoWeAre">
            <Waves src={process.env.PUBLIC_URL + 'assets/images/waves.png'} alt="" />
            <Hand>
                <img src={process.env.PUBLIC_URL + 'assets/images/hand.svg'} alt="" />
            </Hand>
            <Main>
                <div>
                    <MainHeading1 inverse={1} color={lightGray}>{t('WhoWeAre.title')}</MainHeading1>
                    <CurvedLine />
                </div>
                <Content
                    initial={initial}
                    transition={transition}
                    animate={animation}
                >
                    <Rocket>
                        <img src={process.env.PUBLIC_URL + 'assets/images/rocket2.png'} alt="" width="400" height="400" />
                    </Rocket>
                    <WhoWeAreText>
                        <Human>
                            <img src={process.env.PUBLIC_URL + 'assets/images/human-edited.svg'} alt="" width="400" height="400" />
                        </Human>

                        <Text>
                            {whoWeAre[indexArr]}
                        </Text>
                        <div>
                            <Circle onClick={() => changeIndexArr(0)} backColor={indexArr === 0 ? 1 : 0} />
                            <Circle onClick={() => changeIndexArr(1)} backColor={indexArr === 1 ? 1 : 0} />
                            <Circle onClick={() => changeIndexArr(2)} backColor={indexArr === 2 ? 1 : 0} />
                        </div>
                    </WhoWeAreText>
                </Content>
            </Main>
        </WhoWeAreSection>
    );
};

export default WhoWeAre;
