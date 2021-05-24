// react
import React from 'react';

// third-party
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// application
import Dropdown from './Dropdown';
import { localeChange } from '../../store/locale';

function DropdownLanguage(props) {
    const { locale, localeChange: changeLocale } = props;

    const languages = [
        {
            ProductCategory: 'English',
            locale: 'en',
            code: 'EN',
            icon: 'images/languages/en.jpg',
            icon_srcset: 'images/languages/en.jpg 1x, images/languages/en.jpg 2x',
        },
        {
            ProductCategory: 'Malaysia',
            locale: 'my',
            code: 'MY',
            icon: 'images/languages/my.jpg',
            icon_srcset: 'images/languages/my.jpg 1x, images/languages/my.jpg 2x',
        },
        {
            ProductCategory: 'Chinese',
            locale: 'cn',
            code: 'CN',
            icon: 'images/languages/cn.jpg',
            icon_srcset: 'images/languages/cn.jpg 1x, images/languages/cn.jpg 2x',
        },
    ];

    const language = languages.find((x) => x.locale === locale);

    const title = (
        <React.Fragment>
            <FormattedMessage id="topbar.language" defaultMessage="Language" />
            {': '}
            <span className="topbar__item-value">{language.code}</span>
        </React.Fragment>
    );

    return (
        <Dropdown
            title={title}
            withIcons
            items={languages}
            onClick={(item) => changeLocale(item.locale)}
        />
    );
}

const mapStateToProps = (state) => ({
    locale: state.locale,
});

const mapDispatchToProps = {
    localeChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownLanguage);
