import classNames from "classnames/bind";
import styles from "./OptionItem.module.scss"

const cx = classNames.bind(styles)

function OptionItem({title, icon}) {
    return ( <div className={cx('option-item')}>
        <img className={cx('option-item-icon')} src={icon}/>
        <span>{title}</span>
    </div> );
}

export default OptionItem;