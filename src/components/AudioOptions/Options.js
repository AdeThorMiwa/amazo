import React from "react";
import MenuList from "../MenuList";
import items from "./options-data";
import DropdownBox from "../DropdownBox";
import { ClickAwayListener } from "@material-ui/core";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentlyOpenedPosition } from "../../redux/audio/selector";
import { closeAudioMenu } from "../../redux/audio/actions";

const Options = ({
    position: { top, left },
    bottom = 45,
    right = 5,
    zIndex,
    onClickAway,
}) => {
    if (!top && !left) return null;

    return (
        <DropdownBox
            style={{
                width: 210,
                bottom: bottom,
                top: top,
                right: right,
                left: left,
                zIndex: zIndex,
            }}
        >
            <ClickAwayListener onClickAway={onClickAway}>
                <div>
                    <MenuList items={items} />
                </div>
            </ClickAwayListener>
        </DropdownBox>
    );
};

const mapStateToProps = createStructuredSelector({
    position: selectCurrentlyOpenedPosition,
});

const mapDispatchToProps = (dispatch) => ({
    onClickAway: () => dispatch(closeAudioMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Options);
