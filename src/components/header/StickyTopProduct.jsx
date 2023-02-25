// react
import React, { useEffect, useState } from 'react';

// third-party
import classNames from 'classnames';
import Logo from "../../assets/Emporia.png";
import { Link } from "react-router-dom";
import Search from "./Search";
import { Heart20Svg } from "../../svg";
import Indicator from "./Indicator";
import IndicatorCart from "./IndicatorCart";
import IndicatorAccount from "./IndicatorAccount";

// application
import { ArrowRoundedUp13x8Svg } from '../../svg';

export default function StickyTopProduct() {
    const [show, setShow] = useState(false);

    const showFrom = 100;
    const classes = classNames('totop', {
        'totop--show': show,
    });

    const onClick = () => {
        try {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        } catch {
            window.scrollTo(0, 0);
        }
    };

    useEffect(() => {
        let state = false;
        const onScroll = () => {
            const newState = window.pageYOffset >= showFrom;

            if (state !== newState) {
                setShow(state = newState);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll, { passive: true });
    }, [setShow]);

    return (
        <div className={classes}>
            <div className="totop__body">
                <div className="totop__start" />
                <div className="totop__container container" />
                <div className="totop__end">
                    {/* <button type="button" className="totop__button" onClick={onClick}>
                        <ArrowRoundedUp13x8Svg />
                    </button> */}
                    <div className="site-header__middle container" onClick={() => onClick}>
                        <div>
                            {/* <div className="site-header__logo"> */}
                            <Link to="/">
                                {/* <LogoSvg /> */}
                                <img
                                    className="site-header__logo_img"
                                    src={Logo}
                                    alt=""
                                    style={{ height: "6vw" }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = Logo;
                                    }}
                                />
                            </Link>
                            {/* </div> */}
                        </div>
                        {/* <div className="site-header__search" style={{ margin: "0 16px" }}>
                            <Search context="header" />
                        </div>
                        <div className="nav-panel__indicators">
                            {localStorage.getItem("isLogin") === 'true' && <Indicator url="/shop/wishlist"
                                value={props.wishlist !== undefined && props.wishlist[0] !== undefined && props.wishlist[0].ReturnVal === undefined ? props.wishlist.filter((x) => x.DelInd === 0).length : 0}
                                icon={<Heart20Svg />} />}
                            <IndicatorCart />
                            <IndicatorAccount />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
