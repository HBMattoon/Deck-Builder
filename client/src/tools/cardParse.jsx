import React from 'react'
let key =0;
//two functions to take the card text and seperate it into spans and images in order to display icons correctly


export const manaParse = (manaStr) =>{
  manaStr = manaStr.slice(1, manaStr.length-1);
  let manaArr = manaStr.split('}{')
  manaArr = manaArr.map((val)=>{
    val = val.toLowerCase().replace('/','')
    if(val === 't'){
      val = 'tap'
    }
    return val;
  });
  return(
    manaArr.map((val)=> <i key={key++} className={`ms ms-${val} ms-cost ms-shadow`}></i>)
  )
}

export const parseCardText = (text) => {
  let arr = text.split('');
  let result = [];
  let current = [];
  let i = 0;
  while(arr.length > 0){
    if(arr[0] === '{' ){
      result.push(current.join(''));
      current = [];
      current.push(arr.shift())
    } else if(arr[0] === '}') {
      current.push(arr.shift())
      result.push(current.join(''));
      current = [];
    } else if(arr[0] === '(') {
      result.push(current.join(''));
      current = [];
      current.push(arr.shift())
    } else if(arr[0] === ')') {
      current.push(arr.shift())
      result.push(current.join(''));
      current = [];
    } else if(arr[0] === '\n'){
      result.push(current.join(''));
      current = [];
      result.push(arr.shift());
      current = [];
    } else {
      current.push(arr.shift())
    }
  }
  result.push(current.join(''));

  return result.map(item => {
    if(item[0] === '{'){
      return manaParse(item);
    } else if(item[0] === '\n'){
      return <br/>
    } else if(item[0] === '(' || item[item.length - 1] === ')'){
      return <span className="oracleRules">{item}</span>
    }else {
      return <span>{item}</span>
    }
  })
}

