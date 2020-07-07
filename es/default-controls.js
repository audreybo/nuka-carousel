function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { getAlignmentOffset } from './utilities/style-utilities';

var defaultButtonStyles = function defaultButtonStyles(disabled) {
  return {
    border: 0,
    background: 'rgba(0,0,0,0.4)',
    color: 'white',
    padding: 10,
    textTransform: 'uppercase',
    opacity: disabled && 0.3,
    cursor: disabled ? 'not-allowed' : 'pointer'
  };
};

export var PreviousButton = function PreviousButton(props) {
  var handleClick = function handleClick(event) {
    event.preventDefault();
    props.previousSlide();
  };

  var _props$defaultControl = props.defaultControlsConfig,
      prevButtonClassName = _props$defaultControl.prevButtonClassName,
      _props$defaultControl2 = _props$defaultControl.prevButtonStyle,
      prevButtonStyle = _props$defaultControl2 === void 0 ? {} : _props$defaultControl2,
      prevButtonText = _props$defaultControl.prevButtonText;
  var disabled = props.currentSlide === 0 && !props.wrapAround || props.slideCount === 0;
  return React.createElement("button", {
    className: prevButtonClassName,
    style: _objectSpread({}, defaultButtonStyles(disabled), {}, prevButtonStyle),
    disabled: disabled,
    onClick: handleClick,
    "aria-label": "previous",
    type: "button"
  }, prevButtonText || 'Prev');
};
export var nextButtonDisabled = function nextButtonDisabled(_ref) {
  var cellAlign = _ref.cellAlign,
      cellSpacing = _ref.cellSpacing,
      currentSlide = _ref.currentSlide,
      frameWidth = _ref.frameWidth,
      positionValue = _ref.positionValue,
      slideCount = _ref.slideCount,
      slidesToShow = _ref.slidesToShow,
      slideWidth = _ref.slideWidth,
      wrapAround = _ref.wrapAround;
  var buttonDisabled = false;

  if (!wrapAround) {
    var alignmentOffset = getAlignmentOffset(currentSlide, {
      cellAlign: cellAlign,
      cellSpacing: cellSpacing,
      frameWidth: frameWidth,
      slideWidth: slideWidth
    });
    var relativePosition = positionValue - alignmentOffset;
    var width = slideWidth + cellSpacing;
    var endOffset = cellAlign === 'center' ? 2 * alignmentOffset : alignmentOffset;
    var endPosition = -width * slideCount + width * slidesToShow - endOffset;
    buttonDisabled = relativePosition < endPosition || Math.abs(relativePosition - endPosition) < 0.01;
  }

  return buttonDisabled;
};
export var NextButton = function NextButton(props) {
  var handleClick = function handleClick(event) {
    event.preventDefault();
    props.nextSlide();
  };

  var cellAlign = props.cellAlign,
      cellSpacing = props.cellSpacing,
      currentSlide = props.currentSlide,
      defaultControlsConfig = props.defaultControlsConfig,
      frameWidth = props.frameWidth,
      left = props.left,
      slideCount = props.slideCount,
      slidesToShow = props.slidesToShow,
      slideWidth = props.slideWidth,
      top = props.top,
      vertical = props.vertical,
      wrapAround = props.wrapAround;
  var nextButtonClassName = defaultControlsConfig.nextButtonClassName,
      _defaultControlsConfi = defaultControlsConfig.nextButtonStyle,
      nextButtonStyle = _defaultControlsConfi === void 0 ? {} : _defaultControlsConfi,
      nextButtonText = defaultControlsConfig.nextButtonText;
  var disabled = nextButtonDisabled({
    cellAlign: cellAlign,
    cellSpacing: cellSpacing,
    currentSlide: currentSlide,
    frameWidth: frameWidth,
    positionValue: vertical ? top : left,
    slideCount: slideCount,
    slidesToShow: slidesToShow,
    slideWidth: slideWidth,
    wrapAround: wrapAround
  });
  return React.createElement("button", {
    className: nextButtonClassName,
    style: _objectSpread({}, defaultButtonStyles(disabled), {}, nextButtonStyle),
    disabled: disabled,
    onClick: handleClick,
    "aria-label": "next",
    type: "button"
  }, nextButtonText || 'Next');
};
export var getDotIndexes = function getDotIndexes(slideCount, slidesToScroll, slidesToShow, cellAlign, scrollMode) {
  var dotIndexes = [];
  var lastDotIndex = slideCount - slidesToShow;

  switch (cellAlign) {
    case 'center':
    case 'right':
      lastDotIndex += slidesToShow - 1;
      break;
  }

  if (lastDotIndex < 0) {
    return [0];
  }

  for (var i = 0; i < lastDotIndex; i += slidesToScroll) {
    dotIndexes.push(i);
  }

  if (cellAlign === 'left' && scrollMode === 'page') {
    lastDotIndex = Math.floor(slideCount - (slideCount % slidesToShow || slidesToShow));
  }

  dotIndexes.push(lastDotIndex);
  return dotIndexes;
};
export var PagingDots = function PagingDots(props) {
  var getListStyles = function getListStyles() {
    return {
      position: 'relative',
      top: -10,
      display: 'flex',
      margin: 0,
      padding: 0,
      listStyleType: 'none'
    };
  };

  var getButtonStyles = function getButtonStyles(active) {
    return {
      cursor: 'pointer',
      opacity: active ? 1 : 0.5,
      background: 'transparent',
      border: 'none',
      fill: 'black'
    };
  };

  var indexes = getDotIndexes(props.slideCount, props.slidesToScroll, props.slidesToShow, props.cellAlign, props.scrollMode);
  var _props$defaultControl3 = props.defaultControlsConfig,
      pagingDotsContainerClassName = _props$defaultControl3.pagingDotsContainerClassName,
      pagingDotsClassName = _props$defaultControl3.pagingDotsClassName,
      _props$defaultControl4 = _props$defaultControl3.pagingDotsStyle,
      pagingDotsStyle = _props$defaultControl4 === void 0 ? {} : _props$defaultControl4;
  return React.createElement("ul", {
    className: pagingDotsContainerClassName,
    style: getListStyles()
  }, indexes.map(function (index) {
    var isActive = props.currentSlide === index;
    return React.createElement("li", {
      key: index,
      className: isActive ? 'paging-item active' : 'paging-item'
    }, React.createElement("button", {
      className: pagingDotsClassName,
      type: "button",
      style: _objectSpread({}, getButtonStyles(isActive), {}, pagingDotsStyle),
      onClick: props.goToSlide.bind(null, index),
      "aria-label": "slide ".concat(index + 1, " bullet")
    }, React.createElement("svg", {
      className: "paging-dot",
      width: "6",
      height: "6"
    }, React.createElement("circle", {
      cx: "3",
      cy: "3",
      r: "3"
    }))));
  }));
};