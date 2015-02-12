/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var empty = makeEmptyMatrix(n);
  var board = new Board(empty);
  var count = 0;
  var recursiveFunc = function(board){
    for(var i = 0;  i < board.len; i++){
      if(!board.getIJ(i, i)){
        board.setIJ(i, i, 1);
        if(checkCollision(board, i, i)) {
          board.setIJ(i, i, 0);
        }
        else{
          count++;
          if(count === n){
            return board;
          }else{
            return recursiveFunc(board);
          }
        }
      }
    }
    // loop through all emtpy spaces (or all spaces and check if empty)
    // see if we can add
    // if not - continue
    // if no collisions call recursiveFunc(board) after adding piece
  };

  var checkCollision = function(board, i, j){
    return board.hasRowConflictAt(i) || board.hasColConflictAt(j);
  };
  var solution = recursiveFunc(board);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.get('n')));
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n:n});
  var solutionCount = 0;
  var rowIndex = 0;

  var recursiveFunc = function(board, rowIndex){
    if (rowIndex === n){
      solutionCount++;
      return;
    }
    var row = board.get(rowIndex);
    for (var j = 0; j < n; j++){
      row[j] = 1;
      if (!checkCollision(board, rowIndex, j)){
        recursiveFunc(board, rowIndex + 1);
      }
      row[j] = 0;
    }
  };

  var checkCollision = function(board, i, j){
    return board.hasRowConflictAt(i) || board.hasColConflictAt(j);
  };

  recursiveFunc(board, rowIndex);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var empty = makeEmptyMatrix(n);
  var board = new Board(empty);
  var count = 0;
  var stack = [];
  var recursiveFunc = function(board){
    for(var i = 0;  i < board.len; i++){
      for(var j = 0; j < board.len; j++){
        if(!board.getIJ(i, j)){
          board.setIJ(i, j, 1);
          if(checkCollision(board, i, j)) {
            board.setIJ(i, j, 0);
          }
          else{
            stack.push([i,j]);
            count++;
            if(count === n){
              return board;
            }else{
              var temp = recursiveFunc(board);
              if (temp) {
                return temp;
              }
            }
          }
        }
      }
    }
    if (stack.length > 0){
      var coor = stack.pop();
      board.get(coor[0])[coor[1]] = 0;
      count--;
    }
    // loop through all emtpy spaces (or all spaces and check if empty)
    // see if we can add
    // if not - continue
    // if no collisions call recursiveFunc(board) after adding piece
  };
  var checkCollision = function(board, i, j){
    return board.hasRowConflictAt(i) || board.hasColConflictAt(j) || board.hasMajorDiagonalConflictAt(i-j) || board.hasMinorDiagonalConflictAt(i+j);
  };
  var solution = recursiveFunc(board);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  if(n===0){
    return [];
  }
  if(solution !== undefined) {
    return solution.rows();
  } else{
    return board.rows();
  }
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n:n});
  var solutionCount = 0;
  var rowIndex = 0;

  var recursiveFunc = function(board, rowIndex){
    if (rowIndex === n){
      solutionCount++;
      return;
    }
    var row = board.get(rowIndex);
    for (var j = 0; j < n; j++){
      row[j] = 1;
      if (!checkCollision(board, rowIndex, j)){
        recursiveFunc(board, rowIndex + 1);
      }
      row[j] = 0;
    }
  };

  var checkCollision = function(board, i, j){
    return board.hasRowConflictAt(i) || board.hasColConflictAt(j) || board.hasMajorDiagonalConflictAt(i-j) || board.hasMinorDiagonalConflictAt(i+j);
  };

  recursiveFunc(board, rowIndex);
  return solutionCount;

};


var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

// // return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// window.countNQueensSolutions = function(n) {
//   var solutions = {};
//   var empty = makeEmptyMatrix(n);
//   var board = new Board(empty);
//   var count = 0;
//   var solutionCount = 0;
//   var stack = [];
//   var recursiveFunc = function(board){
//     for(var i = 0;  i < board.len; i++){
//       for(var j = 0; j < board.len; j++){
//         console.log(i,j,count);
//         if(!board.getIJ(i, j)){
//           board.setIJ(i, j, 1);
//           if(checkCollision(board, i, j)) {
//             board.setIJ(i, j, 0);
//           }
//           else{
//             stack.push([i,j]);
//             count++;
//             if(count === n){
//               var temp_key = JSON.stringify(board);
//               console.log(temp_key);
//               if (!solutions[temp_key]){
//                 solutions[temp_key] = true;
//                 solutionCount++;
//               }
//             }else{
//               //recursiveFunc(board);
//             }
//           }
//         }
//       }
//     }
//     if (stack.length > 0){
//       var coor = stack.pop();
//       board.get(coor[0])[coor[1]] = 0;
//       count--;
//     }
//     // loop through all emtpy spaces (or all spaces and check if empty)
//     // see if we can add
//     // if not - continue
//     // if no collisions call recursiveFunc(board) after adding piece
//   };
//   var checkCollision = function(board, i, j){
//     return board.hasRowConflictAt(i) || board.hasColConflictAt(j) || board.hasMajorDiagonalConflictAt(i-j) || board.hasMinorDiagonalConflictAt(i+j);
//   };
//   recursiveFunc(board);
//   console.log('Single solution for ' + n + ' queens:', solutionCount);
//   if (n===0){ return 1 };
//   return solutionCount;

// };
