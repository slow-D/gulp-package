'use strict';

(function(d, w){
  
  let btnCalc = d.querySelector('.calc'),
      wall = d.querySelector('#wall'),
      peregorodka = d.querySelector('#wall2'),
      db40 = d.querySelector('#db40'),
      db44 = d.querySelector('#db44'),
      db48 = d.querySelector('#db48'),
      dbAll = d.querySelectorAll('input[name = "db"]'),
      arrayWall = ['40933','42425','44475'],
      arrayPeregorod = ['22141','24481','27735'];

  let parthosTab = d.querySelector('#wall-parthos'),
      dbTabs = d.querySelectorAll('.form-group-db'),
      parthosDB = d.querySelector('.tabs-parthos'),
      normaDB = d.querySelector('.tabs-norma'),
      checkBox = d.querySelectorAll('.form-check-input--wall');
  
  btnCalc.addEventListener('click', function(e) {
    e.preventDefault();
    let height = d.querySelector('#height').value,
        width = d.querySelector('#width').value,
        result = d.querySelector('#square'),
        door = d.querySelector('input[name = "door"]:checked').value,
        summa = d.querySelector('#summa');
    result.value = Math.round((height / 1000) * (width / 1000));
    if (parthosDB.classList.contains('active-db')) {
      var db = d.querySelector('input[name = "db-parthos"]:checked').value;
      var EURrate = d.getElementById('eurKurs').innerHTML;
      var summaNum = (result.value * db) * +EURrate + +door;    
    } else {
      var db = d.querySelector('input[name = "db"]:checked').value;
      var summaNum = result.value * db + +door;
    }
    summa.innerHTML = summaNum.toLocaleString();
  });
  
  [peregorodka, wall].forEach(index => {
    index.addEventListener('change', e => {
      e.preventDefault();
      let currentArray;
      if (e.target.id == 'wall') {
        currentArray = arrayWall;
      } else {
        currentArray = arrayPeregorod;
      }
      dbAll = Array.from(dbAll);
      dbAll.forEach((db, i) => {
        db.value = currentArray[i];
      });
    });
  });
  

  
      
  checkBox.forEach((el, i) => {
    el.addEventListener('click', function() {
      dbTabs.forEach((el, i) => {
        el.classList.remove('active-db');
      });
      normaDB.classList.add('active-db');
      });
  });

  parthosTab.addEventListener('click', function() {
    dbTabs.forEach((el, i) => {
      el.classList.remove('active-db');
    });
    parthosDB.classList.add('active-db');
  });
  
  
}(document, window));