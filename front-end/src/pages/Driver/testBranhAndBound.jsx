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
  const [arrayCorsPickUp, setArrayCorsPickUp] = useState([
    "16.026513367000064,108.22227876200009",
    "16.034384525000064,108.21924603800005",
    "16.065571275000025,108.20156259000004",
  ]);
  const [arrayCorsDrop, setArrayCorsDrop] = useState([
    "16.47432102500005,107.59577389200007",
    "16.4638649,107.5995801",
    "16.47019663100002,107.58647058300005",
  ]);

  const [check, setCheck] = useState(arrayCorsPickUp.length + 1);

  const [currentLat, setCurrentLat] = useState("15.990784");
  const [currentLong, setCurrentLong] = useState("108.2523648");
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    if (arrayCorsPickUp.length === check) {
      const newArray = [];
      for (let i = 0; i < arrayCorsPickUp.length; i++) {
        let subDestination = "";
        for (let j = 0; j < arrayCorsPickUp.length; j++) {
          if (i !== j && j !== arrayCorsPickUp.length - 1) {
            subDestination += arrayCorsPickUp[j] + "%7C";
          }
          if (i !== j && j === arrayCorsPickUp.length - 1) {
            subDestination += arrayCorsPickUp[j];
          }
          if (
            i === arrayCorsPickUp.length - 1 &&
            j === arrayCorsPickUp.length - 1
          ) {
            subDestination = subDestination.slice(0, subDestination.length - 3);
          }
        }
        newArray.push({ start: arrayCorsPickUp[i], des: subDestination });
      }

      setArrayFakeAPI(newArray); // Update state only once after the loop
    }
  }, [arrayCorsPickUp]); // Empty dependency array ensures this runs only once on mount

  const getDistance = async (start, destination, indexCurrent) => {
    if (currentLat && currentLong) {
      let tempArrayDistance = [];
      try {
        const responseMap = await fetch(
          `https://rsapi.goong.io/DistanceMatrix?origins=${start}&destinations=${destination}&vehicle=car&api_key=zdjnB8wI1elnVtepLuHTro4II956dXuMpw8MHGPo`
        );
        const data = await responseMap.json();
        // console.log(data);
        console.log(data.rows[0].elements);
        if (data.rows[0].elements) {
          data.rows[0].elements.forEach((item, index) => {
            tempArrayDistance.push(item.distance.value);
          });
          tempArrayDistance = [
            ...tempArrayDistance.slice(0, indexCurrent),
            0,
            ...tempArrayDistance.slice(indexCurrent),
          ];
        }
      } catch (error) {
        console.log(error);
      }

      if (tempArrayDistance.length > 0) {
        setMatrix((prevState) => {
          return [...prevState, tempArrayDistance];
        });
      }
    }
  };

  useEffect(() => {
    if (arrayFakeAPI.length > 0) {
      // Start printing elements every 2 seconds
      const interval = setInterval(() => {
        // console.log(arrayFakeAPI[currentIndex]); //Call API TO GET DISTANCE
        getDistance(
          arrayFakeAPI[currentIndex].start,
          arrayFakeAPI[currentIndex].des,
          currentIndex
        );
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

  useEffect(() => {
    if (matrix.length > 3) {
      const result = [];
      result[0] = 0;
      const checkTraveled = [];
      let total = 0;
      let bestTotal = Number.MAX_VALUE;
      let bestResult = [];
      for (let i = 0; i < arrayCorsPickUp.length; i++) {
        checkTraveled[i] = false;
      }
      checkTraveled[0] = true;
      // console.log(checkTraveled);
      // console.log(arrayCorsPickUp);

      const update = () => {
        console.log(total);
        console.log(result);
        if (total < bestTotal) {
          console.log("OK   " + total);
          bestTotal = total;
          bestResult = [];
          for (let i = 0; i < result.length; i++) {
            bestResult.push(result[i]);
          }
          console.log(bestResult + "     best choice");
        }
      };

      const travel = (index) => {
        if (total > bestTotal) {
          return;
        }

        for (let i = 0; i < arrayCorsPickUp.length; i++) {
          if (!checkTraveled[i] && matrix[result[index - 1]][i] > 0) {
            result[index] = i;
            checkTraveled[i] = true;
            total += matrix[result[index - 1]][i];
            if (index === arrayCorsPickUp.length - 1) {
              // console.log(result);
              // console.log(total);
              update();
            } else {
              travel(index + 1);
            }

            total -= matrix[result[index - 1]][i];
            checkTraveled[i] = false;
          }
        }
      };

      travel(1);

      console.log(bestResult);
      console.log(bestTotal);
    }
  }, [matrix]);

  useEffect(() => {
    if (currentLat && currentLong) {
      setArrayCorsPickUp((prevState) => {
        return [`${currentLat},${currentLong}`, ...prevState];
      });
      // arrayCorsPickUp.unshift(`${currentLat},${currentLong}`);
      // arrayCorsPickUp.push(`${currentLat},${currentLong}`);
    }
  }, []);

  // useEffect(() => {
  //   console.log(arrayCorsPickUp);
  // }, [arrayCorsPickUp]);

  return (
    <div>
      <h1>TEST</h1>
    </div>
  );
}

export default TestBranchAndBound;

/////

// import React, { useState } from "react";

// const BranchAndBound = () => {
//   // Example graph (asymmetric) represented as an adjacency matrix
//   const graph = [
//     [0, 10, 15, 20],
//     [5, 0, 9, 10],
//     [6, 13, 0, 12],
//     [8, 8, 9, 0],
//   ];

//   const n = graph.length;

//   // Function to calculate the lower bound
//   const calculateBound = (currentNode, visited) => {
//     let bound = 0;

//     // Add the smallest outgoing edge from the current node
//     let minOutgoing = Infinity;
//     for (let j = 0; j < n; j++) {
//       if (!visited[j] && graph[currentNode][j] > 0) {
//         minOutgoing = Math.min(minOutgoing, graph[currentNode][j]);
//       }
//     }
//     if (minOutgoing !== Infinity) bound += minOutgoing;

//     // Add the smallest outgoing edge for all unvisited nodes
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
//       // All nodes visited, no need to return to start
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
//       <h1>Branch and Bound Shortest Path (Hamiltonian Path)</h1>
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
