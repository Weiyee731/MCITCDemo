// react
import React from 'react';
import {
    Link,
    BrowserRouter as Router,
} from "react-router-dom";
// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';

// application
import { ArrowRoundedLeft7x11Svg, ArrowRoundedRight7x11Svg } from '../../svg';

function BlockHeader(props) {
    const {
        title,
        groups,
        onPrev,
        onNext,
        onGroupClick,
    } = props;
    let { arrows } = props;

    if (arrows) {
        arrows = (
            <div className="block-header__arrows-list">
                <button className="block-header__arrow block-header__arrow--left" type="button" onClick={onPrev}>
                    <ArrowRoundedLeft7x11Svg />
                </button>
                <button className="block-header__arrow block-header__arrow--right" type="button" onClick={onNext}>
                    <ArrowRoundedRight7x11Svg />
                </button>
            </div>
        );
    }

    let { showAll } = props;
    if (showAll) {
        showAll = (
            <div className="block-header__arrows-list">
                <button className="block-header__showAll" >
                    <Link to={showAll}>
                    Show All   
                    </Link>
                </button>
            </div>
        );
    }

    let groupsList;

    if (groups.length > 0) {
        groupsList = groups.map((group, index) => {
            const classes = classNames('block-header__group', {
                'block-header__group--active': group.current,
            });

            return (
                <li key={index}>
                    <button type="button" className={classes} onClick={() => onGroupClick(group)}>
                        {group.name}
                    </button>
                </li>
            );
        });

        groupsList = (
            <ul className="block-header__groups-list">
                {groupsList}
            </ul>
        );
    }

    return (
        <div className="block-header">
            <h3 className="block-header__title">{title}</h3>
            <div className="block-header__divider" />
            {groupsList}
            {arrows}
            {showAll}
        </div>
    );
}

BlockHeader.propTypes = {
    title: PropTypes.string,
    arrows: PropTypes.bool,
    groups: PropTypes.array,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    onGroupClick: PropTypes.func,
};
BlockHeader.defaultProps = {
    groups: [],
    onGroupClick: () => { },
};

export default BlockHeader;
