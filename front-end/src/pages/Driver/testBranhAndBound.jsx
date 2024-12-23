// import React, { useEffect, useState } from "react";

// const distances = {
//   A: { B: 10, C: 15, D: 20, E: 25 },
//   B: { A: 10, C: 35, D: 25, E: 30 },
//   C: { A: 15, B: 35, D: 30, E: 20 },
//   D: { A: 20, B: 25, C: 30, E: 15 },
//   E: { A: 25, B: 30, C: 20, D: 15 },
// };

// // Helper function to get the distance between two points
// const getDistance = (point1, point2) => {
//   return distances[point1][point2];
// };

// const TestMap = () => {
//   const [shortestPath, setShortestPath] = useState([]);
//   const [shortestDistance, setShortestDistance] = useState(null);
//   const [count, setCount] = useState(0);

//   const heldKarpSimplifiedWithPath = (start, points) => {
//     const memo = {};
//     const pathMemo = {};

//     const tsp = (current, remaining) => {
//       if (remaining.length === 0) {
//         return { distance: 0, path: [current] };
//       }

//       const key = `${current}-${remaining.join(",")}`;
//       if (memo[key] !== undefined) {
//         return { distance: memo[key], path: pathMemo[key] };
//       }

//       let minDistance = Infinity;
//       let bestPath = [];

//       for (let i = 0; i < remaining.length; i++) {
//         const next = remaining[i];
//         const distance = getDistance(current, next);
//         const newRemaining = [
//           ...remaining.slice(0, i),
//           ...remaining.slice(i + 1),
//         ];
//         const result = tsp(next, newRemaining);
//         const totalDistance = distance + result.distance;

//         if (totalDistance < minDistance) {
//           minDistance = totalDistance;
//           bestPath = [current, ...result.path];
//         }
//       }

//       memo[key] = minDistance;
//       pathMemo[key] = bestPath;
//       return { distance: minDistance, path: bestPath };
//     };

//     const remainingPoints = points.filter((p) => p !== start);
//     return tsp(start, remainingPoints);
//   };

//   const calculateShortestPath = () => {
//     const points = ["A", "B", "C", "D", "E"];
//     const start = "A";
//     const { distance, path } = heldKarpSimplifiedWithPath(start, points);
//     setShortestPath(path);
//     setShortestDistance(distance);
//   };

//   const hello = () => {
//     setCount(count + 1);
//     console.log("HELLO");
//   };
//   useEffect(() => {
//     if (count < 10) {
//       const test = setInterval(() => {
//         hello();
//       }, 5000);
//       return () => clearInterval(test);
//     } else {
//       console.log("BYE");
//     }
//   }, [count]);

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h1>Shortest Path Finder</h1>
//       <button
//         onClick={calculateShortestPath}
//         style={{ marginBottom: "20px", padding: "10px 15px" }}
//       >
//         Find Shortest Path
//       </button>
//       {shortestPath.length > 0 && (
//         <div>
//           <h2>Results</h2>
//           <p>
//             <strong>Shortest Path:</strong> {shortestPath.join(" → ")}
//           </p>
//           <p>
//             <strong>Shortest Distance:</strong> {shortestDistance}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestMap;

// <<=========================================================================================================================>>

//  BRANCH AND BOUND TECHNIQUE (TSP)

// import React, { useState } from "react";

// const BranchAndBound = () => {
//   // Example graph represented as an adjacency matrix
//   const graph = [
//     [0, 10, 15, 20],
//     [10, 0, 35, 25],
//     [15, 35, 0, 30],
//     [20, 25, 30, 0],
//   ];

//   console.log(graph[0][1]);

//   const n = graph.length;

//   // Function to calculate the lower bound
//   const calculateBound = (currentNode, visited) => {
//     let bound = 0;

//     // Add the smallest edge from the current node
//     let minCost = Infinity;
//     for (let j = 0; j < n; j++) {
//       if (!visited[j] && graph[currentNode][j] > 0) {
//         minCost = Math.min(minCost, graph[currentNode][j]);
//       }
//     }
//     if (minCost !== Infinity) bound += minCost;

//     // Add the smallest edges for all unvisited nodes
//     for (let i = 0; i < n; i++) {
//       if (!visited[i]) {
//         let minEdge = Infinity;
//         for (let j = 0; j < n; j++) {
//           if (i !== j && !visited[j]) {
//             minEdge = Math.min(minEdge, graph[i][j]);
//           }
//         }
//         if (minEdge !== Infinity) bound += minEdge;
//       }
//     }

//     return bound;
//   };

//   // Branch and Bound function
//   const branchAndBound = (
//     currentNode,
//     visited,
//     path,
//     cost,
//     bestCost,
//     bestPath
//   ) => {
//     if (path.length === n) {
//       // All nodes visited
//       if (cost < bestCost.value) {
//         bestCost.value = cost;
//         bestPath.value = [...path];
//       }
//       return;
//     }

//     for (let nextNode = 0; nextNode < n; nextNode++) {
//       if (!visited[nextNode] && graph[currentNode][nextNode] > 0) {
//         visited[nextNode] = true;
//         path.push(nextNode);
//         const nextCost = cost + graph[currentNode][nextNode];

//         // Calculate the bound for this branch
//         const bound = nextCost + calculateBound(nextNode, visited);

//         // Only explore this branch if the bound is better than the best cost
//         if (bound < bestCost.value) {
//           branchAndBound(nextNode, visited, path, nextCost, bestCost, bestPath);
//         }

//         // Backtrack
//         visited[nextNode] = false;
//         path.pop();
//       }
//     }
//   };

//   // Main function to solve the problem
//   const findShortestPath = () => {
//     const visited = Array(n).fill(false);
//     visited[0] = true; // Start from node 0
//     const path = [0];
//     const bestCost = { value: Infinity };
//     const bestPath = { value: [] };

//     branchAndBound(0, visited, path, 0, bestCost, bestPath);

//     return { shortestPath: bestPath.value, shortestCost: bestCost.value };
//   };

//   // State to store the result
//   const [result, setResult] = useState(null);

//   // Handler for finding the shortest path
//   const handleFindPath = () => {
//     const solution = findShortestPath();
//     setResult(solution);
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h1>Branch and Bound Shortest Path</h1>
//       <button onClick={handleFindPath} style={{ padding: "10px 20px" }}>
//         Find Shortest Path
//       </button>
//       {result && (
//         <div style={{ marginTop: "20px" }}>
//           <h2>Results</h2>
//           <p>
//             <strong>Shortest Path:</strong> {result.shortestPath.join(" → ")}
//           </p>
//           <p>
//             <strong>Shortest Cost:</strong> {result.shortestCost}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BranchAndBound;

// TEST

import React, { useState, useEffect } from "react";

function TestBranchAndBound() {
  const [arrayFakeAPI, setArrayFakeAPI] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const coorDriver = "*";
    const test = [1, 2, 3];
    let destination = "";

    test.forEach((item, index) => {
      if (index === test.length - 1) {
        destination += item;
      } else {
        destination += item + "%7c";
      }
    });

    const matrix = [];
    let firstArray = [];
    firstArray[0] = 0;
    test.forEach((item) => {
      firstArray.push(coorDriver + item);
    });

    matrix.push(firstArray);

    const newArray = [];
    for (let i = 0; i < test.length; i++) {
      let subDestination = "";
      for (let j = 0; j < test.length; j++) {
        if (i !== j && j !== test.length - 1) {
          subDestination += test[j] + "%7C";
        }
        if (i !== j && j === test.length - 1) {
          subDestination += test[j];
        }
        if (i === test.length - 1 && j === test.length - 1) {
          subDestination = subDestination.slice(0, subDestination.length - 3);
        }
      }
      newArray.push({ start: test[i], des: subDestination });
    }

    setArrayFakeAPI(newArray); // Update state only once after the loop
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    if (arrayFakeAPI.length > 0) {
      // Start printing elements every 2 seconds
      const interval = setInterval(() => {
        console.log(arrayFakeAPI[currentIndex]); //Call API TO GET DISTANCE

        setCurrentIndex((prevIndex) => {
          if (prevIndex < arrayFakeAPI.length - 1) {
            return prevIndex + 1; // Move to the next element
          } else {
            clearInterval(interval); // Stop when the last element is printed
            return prevIndex;
          }
        });
      }, 2000);

      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [arrayFakeAPI, currentIndex]);

  return (
    <div>
      <h1>TEST</h1>
    </div>
  );
}

export default TestBranchAndBound;
