'use strict';

(function(d, w){


  var checkCalc = d.getElementById('calc');
  if (!checkCalc) return false;


  var arrImgs = d.querySelectorAll('.calc-show__item'),
      calcShow = d.querySelector('.calc-show'),
      arrProduct = d.querySelectorAll('.wall-btn');

  var insideDB = d.querySelectorAll('.inside-db'),
      isEuro;

  var inputText = d.querySelectorAll('.input-text');


  arrProduct.forEach((elem, i) => {

    elem.addEventListener('click', () => {

      if (calcShow.classList.contains('calc-show--empty')) {
        calcShow.classList.remove('calc-show--empty');
      }

      arrImgs.forEach((el, i) => {
        el.classList.remove('is-show');
        insideDB[i].classList.remove('is-show-db')
      });

      arrImgs[i].classList.add('is-show');
      insideDB[i].classList.add('is-show-db')

      isEuro = i == 2 ? true : false;

      if ( i ==  0 ) {
        d.querySelectorAll('.input-door').forEach(function(elem, j) {
          elem.removeAttribute("checked");
        });
        d.querySelector('.input-door--first').checked = 'checked';
        d.querySelectorAll('.input-door').forEach(function(elem, j) {
          elem.setAttribute("disabled", "true");
        });
      } else {
        d.querySelectorAll('.input-door').forEach(function(elem, j) {
          elem.removeAttribute("disabled");
        });
      }

      calcResult(d.querySelector('.js-calc-square').value, +d.querySelector('.input-door:checked').value, isEuro);

    });

  });




  function validRange(width, height, input) {

    var checkedWall = d.querySelector('.js-wall:checked'),
        wrapCalc = d.querySelector('.calc-write__item:nth-child(2)'),
        checkErrorDiv = d.querySelector('.error'),
        minWidth = checkedWall.dataset.minWidth,
        maxWidth = checkedWall.dataset.maxWidth,
        minHeight = checkedWall.dataset.minHeight,
        maxHeight = checkedWall.dataset.maxHeight;

    if (width) {
      if (input.value !== '') {
        if ( +input.value < minWidth || +input.value > maxWidth ) {
          input.style.color = 'red';
          var unlimitWidth = maxWidth == Infinity ? '' : ' до ' + maxWidth + ' мм';
          var text = 'Введите значение ширины от ' + minWidth + ' мм ' + unlimitWidth;
          appendError(text);
        } else {
          input.style.color = 'black';
          checkErrorDiv.innerHTML = '';
          // validRange(false, true, d.querySelector('.js-square-height'));
        }
      }
    }

    if (height) {
      if (input.value !== '') {
        if ( +input.value < minHeight || +input.value > maxHeight ) {
          input.style.color = 'red';
          var text = 'Введите значение высоты от ' + minHeight + ' мм ' + ' до ' + maxHeight + ' мм';
          appendError(text);
        } else {
          input.style.color = 'black';
          checkErrorDiv.innerHTML = '';
          // validRange(true, false, d.querySelector('.js-square-width'));
        }
      }
    }

  }


  inputText.forEach((elem, i) => {

    elem.addEventListener('change', function () {

      var width = d.querySelector('.js-square-width'),
          height = d.querySelector('.js-square-height'),
          outputSquare = d.querySelector('.js-calc-square'),
          inputWidth = this.classList.contains('js-square-width'),
          inputHeight = this.classList.contains('js-square-height'),
          checkErrorDiv = d.querySelector('.error'),
          widthValue, heightValue;


      var n = this.value;

      validRange(inputWidth, inputHeight, this);
      validMinus(this, n);

      widthValue = +width.value;
      heightValue = +height.value;


      writeSign(inputWidth, inputHeight, n);

      // this.value = n.replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');

      // width = width.replace(' ', '');
      // height = height.replace(' ', '');
      // 
      // if (checkErrorDiv) {
      //   checkErrorDiv.remove();
      // }

      // debugger;
      var resultSquare = calcSquare(widthValue, heightValue) / 1000000;

      outputSquare.value = resultSquare !== 0 ? resultSquare : 'Расчет проводится автоматически';

      calcResult(resultSquare, +d.querySelector('.input-door:checked').value, isEuro);

      // var ckeckedRadio = d.querySelector('.input-db:checked'),
      //     inputItog = d.getElementById('itog');
      // // debugger;
      // var result = resultSquare * ckeckedRadio.value;
      // result = roundResult(result);
      // inputItog.innerHTML = result !== 0 ? changeNum(result) : 0;

    });

  });


  var inputDb = d.querySelectorAll('.input-db');

  inputDb.forEach((el, i) => {

    el.addEventListener('change', function() {
      var squareDB = d.querySelector('.js-calc-square').value;
      if ( !isNaN(squareDB) ) { calcResult(squareDB, +d.querySelector('.input-door:checked').value, isEuro); }
    });

  });

  var inputDoor = d.querySelectorAll('.input-door');

  inputDoor.forEach((el, i) => {

    el.addEventListener('change', function() {
      var squareDB = d.querySelector('.js-calc-square').value,
          valDoor = +this.value;
      if ( !isNaN(squareDB) ) { calcResult(squareDB, valDoor, isEuro); }
    });

  });



  var square = d.querySelectorAll('[class^="js-square-"]');

  function calcSquare(a, b) {
    return a * b;
  }

  function appendError(text) {
    var errorDiv = d.querySelector('.error');
    errorDiv.innerHTML = text;
    return false;
  }

  function validMinus(el, val) {
    if (val < 0) el.value = 0;
  }

  function roundResult(n) {
    return Math.round(n / 1000) * 1000;
  }

  function changeNum(start, end) {

    d.getElementById('itog').innerHTML = end.toLocaleString();
    // var startNum = start.replace(/&nbsp;+/g, '');
    //     startNum = startNum == '0' ? 0 : startNum;
    // var interval = setInterval(function() {
    //     if ( startNum < end ) {
    //       startNum = +startNum + 1000;
    //     } else {
    //       startNum = startNum - 1000;
    //     }
        
    //     d.getElementById('itog').innerHTML = startNum.toLocaleString();
    //     if(startNum == end) {
    //         d.getElementById('itog').innerHTML = startNum.toLocaleString();
    //         clearInterval(interval);
    //     }
    // }, 0.1);
  }

  function calcResult(resultSquare, door, eu) {

    var ckeckedRadio = d.querySelector('.is-show-db .input-db:checked').value,
        inputItog = d.getElementById('itog'),
        textEuro = d.getElementById('euro').innerHTML;

    if (eu) {
      ckeckedRadio = (ckeckedRadio * textEuro) / 1.2;
    }

    var result = resultSquare * ckeckedRadio + door;

    if ( !isNaN(result) ) {
      result = roundResult(result);
      changeNum(inputItog.innerHTML, result);
    }
    // inputItog.innerHTML = result !== 0 ? changeNum(inputItog.innerHTML, result) : 0;

  }


  function writeSign(width, height, num) {

    var inputWriteWidth = d.querySelector('.abs-img--width'),
        inputWriteHeight = d.querySelector('.abs-img--height');

    num = +num.toLocaleString() + ' мм';

    if (width) {
      inputWriteWidth.innerHTML = num;
    }

    if (height) {
      inputWriteHeight.innerHTML = num;
    }

  }
  
  
}(document, window));