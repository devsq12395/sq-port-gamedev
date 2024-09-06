import React, { useState, useRef, useEffect, useContext } from 'react';
import gsap from 'gsap';
import MyContext from '../MyContext';

// Define the types for HeaderBtn props
interface HeaderBtnProps {
    text: string;
    selectedTab: string;
    onClick: () => void;
}

interface HeaderSelectedProps {
    left: number;
    width: number;
}

const Header: React.FC = () => {
    const [selTab, changeSelTab] = useState<string>("About Me");
    const [selTabInfo, setSelTabInfo] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
    const { setSelTab, setAnimate, setIsMovTween } = useContext(MyContext);

    const tabs: string[] = ["About Me", "Websites", "Skills", "Contact"];
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const navRef = useRef<HTMLDivElement | null>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);  // Ref to store the GSAP tween

    const updateTabInfo = (index: number) => {
        const tabElement = tabRefs.current[index];
        if (tabElement && navRef.current) {
            const tabRect = tabElement.getBoundingClientRect();
            const navRect = navRef.current.getBoundingClientRect();
            setSelTabInfo({ left: tabRect.left - navRect.left, width: tabRect.width });
        }
    };

    const onClickTab = (tabName: string, index: number) => {
        if (tabName === selTab) return;

        changeSelTab(tabName);
        setSelTab(index);
        updateTabInfo(index);

        if (tweenRef.current) {
            tweenRef.current.kill();
        }

        setIsMovTween(true);

        tweenRef.current = gsap.to({ progress: 0 }, {
            progress: 1,
            duration: 0.15,
            onUpdate: function () {
                setAnimate(this.progress());
            },
            onComplete: () => {
                setIsMovTween(false);
            }
        });
    };

    useEffect(() => {
        const initialTabIndex = tabs.indexOf(selTab);
        updateTabInfo(initialTabIndex);

        // Trigger the initial animation on mount
        setIsMovTween(true);

        tweenRef.current = gsap.to({ progress: 0 }, {
            progress: 1,
            duration: 1,
            onUpdate: function () {
                setAnimate(this.progress());
            },
            onComplete: () => {
                setIsMovTween(false);
            }
        });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const selectedIndex = tabs.indexOf(selTab);
            updateTabInfo(selectedIndex);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [selTab, tabs]);

    return (
        <div className="relative flex justify-center items-center w-full">
            <nav ref={navRef} className="fixed top-0 w-full flex justify-center bg-gray-800 text-white px-2 md:px-8 py-4 h-16 gap-x-4 md:gap-x-10 rounded-b-lg">
                {tabs.map((tab, index) => (
                    <HeaderBtn
                        key={tab}
                        text={tab}
                        selectedTab={selTab}
                        onClick={() => onClickTab(tab, index)}
                        ref={el => tabRefs.current[index] = el}
                    />
                ))}
                <HeaderSelected left={selTabInfo.left} width={selTabInfo.width} />
            </nav>
        </div>
    );
};

// Forward ref for the HeaderBtn component
const HeaderBtn = React.forwardRef<HTMLButtonElement, HeaderBtnProps>(({ text, onClick }, ref) => {
    return (
        <button
            ref={ref}
            className="relative text-sm md:text-base text-blue-400 hover:text-blue-600 focus:outline-none whitespace-nowrap"
            onClick={onClick}
        >
            {text}
        </button>
    );
});

HeaderBtn.displayName = 'HeaderBtn'; // Set display name for forwardRef

// HeaderSelected component
const HeaderSelected: React.FC<HeaderSelectedProps> = ({ left, width }) => {
    return (
        <span
            className="absolute bottom-0 h-1 bg-blue-400 transition-all duration-300 ease-in-out"
            style={{ left, width }}
        ></span>
    );
};

export default Header;
