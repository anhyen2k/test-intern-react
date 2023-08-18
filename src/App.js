import React, { useState } from 'react';
import './App.css';


// môi trường yêu cầu: cần cài đặt nodejs và npm 
// mở terminal sử dụng lệnh (npm start) để chạy bài làm
function generateRandomChar() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}

function generateRandomString() {
  const length = Math.floor(Math.random() * 5) + 1;
  return Array.from({ length }, () => generateRandomChar()).join('');
}

function App() {
  const [randomStrings, setRandomStrings] = useState([]);
  const [sortedStrings, setSortedStrings] = useState([]);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 1000 }, () => generateRandomString());
    setRandomStrings(newArray);
    setSortedStrings([]);
  };

  const bubbleSort = (arr) => {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  };

  const selectionSort = (arr) => {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < len; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      }
    }
    return arr;
  };

  const insertionSort = (arr) => {
    const len = arr.length;
    for (let i = 1; i < len; i++) {
      let current = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > current) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = current;
    }
    return arr;
  };

  const quickSort = (arr) => {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < pivot) left.push(arr[i]);
      else right.push(arr[i]);
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
  };

  const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    const merge = (left, right) => {
      const result = [];
      let leftIndex = 0;
      let rightIndex = 0;
      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          rightIndex++;
        }
      }
      return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    };

    return merge(mergeSort(left), mergeSort(right));
  };

  const sortArray = (method) => {
    let sortedArray = [...randomStrings];
    switch (method) {
      case 'bubble':
        sortedArray = bubbleSort(sortedArray);
        break;
      case 'selection':
        sortedArray = selectionSort(sortedArray);
        break;
      case 'insertion':
        sortedArray = insertionSort(sortedArray);
        break;
      case 'quick':
        sortedArray = quickSort(sortedArray);
        break;
      case 'merge':
        sortedArray = mergeSort(sortedArray);
        break;
      default:
        break;
    }
    setSortedStrings(sortedArray);
  };
  

  return (
    <div className="container">
      <button className="random-button" onClick={generateRandomArray}>Generate Random Array</button>
      <br />
      <h2>Random Strings:</h2>
      <ul>
        {randomStrings.map((str, index) => (
          <li key={index}>{str}</li>
        ))}
      </ul>
      <button className="button" onClick={() => sortArray('bubble')}>Bubble Sort</button>
      <button className="button" onClick={() => sortArray('selection')}>Selection Sort</button>
      <button className="button" onClick={() => sortArray('insertion')}>Insertion Sort</button>
      <button className="button" onClick={() => sortArray('quick')}>Quick Sort</button>
      <button className="button" onClick={() => sortArray('merge')}>Merge Sort</button>
      <h2>Sorted Strings:</h2>
      <ul>
        {sortedStrings.map((str, index) => (
          <li key={index}>{str}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
